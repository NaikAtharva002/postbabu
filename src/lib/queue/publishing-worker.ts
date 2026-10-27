import { Worker, Job } from 'bullmq';
import { prisma } from '../db';
import { redisConnection } from './redis';
import { PUBLISHING_QUEUE_NAME } from './publishing-queue';
import { SocialAdapterFactory } from '../adapters/factory';

export const publishingWorker = new Worker(
  PUBLISHING_QUEUE_NAME,
  async (job: Job<{ postId: string }>) => {
    const { postId } = job.data;
    console.log(`[Worker] Processing publishing job for Post: ${postId}`);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        channels: {
          include: { socialAccount: true },
        },
      },
    });

    if (!post) {
      console.warn(`[Worker] Post ${postId} not found in database. Skipping.`);
      return;
    }

    // Only publish if post is approved or queued
    if (post.status !== 'APPROVED' && post.status !== 'QUEUED') {
      console.warn(`[Worker] Post ${postId} is in '${post.status}' state. Aborting publish.`);
      return;
    }

    // Update status to DISPATCHING
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'DISPATCHING' },
    });

    let hasErrors = false;

    for (const channel of post.channels) {
      try {
        const adapter = SocialAdapterFactory.getAdapter(channel.socialAccount.platform);
        
        console.log(
          `[Worker] Dispatching to ${channel.socialAccount.platform} (${channel.socialAccount.accountName})`
        );

        const result = await adapter.publish({
          accountId: channel.socialAccount.platformId,
          accessToken: channel.socialAccount.accessToken,
          caption: channel.customCaption || post.content,
          mediaUrls: post.mediaUrls,
        });

        await prisma.postChannel.update({
          where: { id: channel.id },
          data: {
            platformPostId: result.platformPostId,
            errorDetails: null,
          },
        });
      } catch (err: any) {
        hasErrors = true;
        console.error(`[Worker] Error publishing to channel ${channel.id}:`, err.message);
        await prisma.postChannel.update({
          where: { id: channel.id },
          data: {
            errorDetails: err.message || 'Unknown publishing error',
          },
        });
      }
    }

    if (hasErrors) {
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'FAILED' },
      });
      throw new Error(`Failed to publish post ${postId} on one or more channels.`);
    } else {
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'PUBLISHED' },
      });
      console.log(`[Worker] Post ${postId} successfully published on all channels!`);
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

publishingWorker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully.`);
});

publishingWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error:`, err);
});
