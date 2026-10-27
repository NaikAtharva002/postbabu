import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { schedulePost } from '@/lib/queue/publishing-queue';
import { generateClientApprovalToken } from '@/lib/approvals/magic-link';
import { sendWhatsAppApprovalNotification } from '@/lib/approvals/whatsapp';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        workspace: true,
        channels: {
          include: { socialAccount: true },
        },
      },
      orderBy: { scheduledFor: 'asc' },
    });
    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      workspaceId,
      content,
      mediaUrls = [],
      scheduledFor,
      channelIds = [],
      requireClientApproval = false,
    } = body;

    if (!workspaceId || !content || !scheduledFor) {
      return NextResponse.json(
        { success: false, error: 'workspaceId, content, and scheduledFor are required' },
        { status: 400 }
      );
    }

    const scheduledDate = new Date(scheduledFor);
    const initialStatus = requireClientApproval ? 'PENDING_APPROVAL' : 'QUEUED';

    const post = await prisma.post.create({
      data: {
        workspaceId,
        content,
        mediaUrls,
        scheduledFor: scheduledDate,
        status: initialStatus,
        channels: {
          create: channelIds.map((socialAccountId: string) => ({
            socialAccountId,
          })),
        },
      },
      include: {
        workspace: {
          include: { agency: true },
        },
      },
    });

    // If client approval is required, create magic token & send WhatsApp ping
    let magicReviewUrl = null;
    if (requireClientApproval) {
      const token = await generateClientApprovalToken(workspaceId);
      if (post.workspace.clientPhone) {
        const notif = await sendWhatsAppApprovalNotification({
          clientPhone: post.workspace.clientPhone,
          clientName: post.workspace.name,
          agencyName: post.workspace.agency.name,
          postCount: 1,
          magicToken: token,
        });
        magicReviewUrl = notif.reviewUrl;
      }
    } else {
      // Direct schedule into BullMQ delayed queue
      try {
        await schedulePost(post.id, scheduledDate);
      } catch (queueErr: any) {
        console.warn('[Queue Notice] Could not push to BullMQ (Redis offline):', queueErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      post,
      magicReviewUrl,
    });
  } catch (err: any) {
    console.error('Error in /api/posts:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
