import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SocialAdapterFactory } from '@/lib/adapters/factory';

/**
 * Vercel Serverless Cron Publisher
 * Automatically triggered by Vercel Cron every minute.
 * Scans PostgreSQL for due posts and publishes them directly to Meta/LinkedIn.
 */
export async function GET(req: Request) {
  // Optional CRON_SECRET authorization for Vercel
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  try {
    const now = new Date();

    // Find all posts that are approved/queued and ready for publishing
    const duePosts = await prisma.post.findMany({
      where: {
        status: { in: ['APPROVED', 'QUEUED'] },
        scheduledFor: { lte: now },
      },
      include: {
        channels: {
          include: { socialAccount: true },
        },
      },
      take: 10, // Process up to 10 due posts per cron tick to stay within serverless execution limits
    });

    if (duePosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No posts due for publication at this time.',
        processed: 0,
        timestamp: now.toISOString(),
      });
    }

    const results = [];

    for (const post of duePosts) {
      // Mark post as DISPATCHING
      await prisma.post.update({
        where: { id: post.id },
        data: { status: 'DISPATCHING' },
      });

      let hasErrors = false;
      const channelResults = [];

      for (const channel of post.channels) {
        try {
          const adapter = SocialAdapterFactory.getAdapter(channel.socialAccount.platform);

          const publishRes = await adapter.publish({
            accountId: channel.socialAccount.platformId,
            accessToken: channel.socialAccount.accessToken,
            caption: channel.customCaption || post.content,
            mediaUrls: post.mediaUrls,
          });

          await prisma.postChannel.update({
            where: { id: channel.id },
            data: {
              platformPostId: publishRes.platformPostId,
              errorDetails: null,
            },
          });

          channelResults.push({ channelId: channel.id, success: true });
        } catch (err: any) {
          hasErrors = true;
          console.error(`[Cron Publish Error] Channel ${channel.id}:`, err.message);

          await prisma.postChannel.update({
            where: { id: channel.id },
            data: { errorDetails: err.message || 'Publishing failed' },
          });

          channelResults.push({ channelId: channel.id, success: false, error: err.message });
        }
      }

      const finalStatus = hasErrors ? 'FAILED' : 'PUBLISHED';
      await prisma.post.update({
        where: { id: post.id },
        data: { status: finalStatus },
      });

      results.push({ postId: post.id, status: finalStatus, channels: channelResults });
    }

    return NextResponse.json({
      success: true,
      processed: duePosts.length,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[Vercel Cron Error]:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
