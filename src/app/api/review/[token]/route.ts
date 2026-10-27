import { NextResponse } from 'next/server';
import { verifyApprovalToken } from '@/lib/approvals/magic-link';
import { prisma } from '@/lib/db';
import { schedulePost } from '@/lib/queue/publishing-queue';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const result = await verifyApprovalToken(token);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.reason },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      workspace: result.workspace,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const result = await verifyApprovalToken(token);

    if (!result.valid || !result.workspace) {
      return NextResponse.json(
        { success: false, error: result.reason },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { postId, action, clientNote } = body; // action: 'APPROVE' | 'REQUEST_REVISION'

    if (!postId || !action) {
      return NextResponse.json(
        { success: false, error: 'postId and action are required' },
        { status: 400 }
      );
    }

    // Verify post belongs to this workspace
    const post = await prisma.post.findFirst({
      where: { id: postId, workspaceId: result.workspace.id },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found in this client workspace' },
        { status: 404 }
      );
    }

    if (action === 'APPROVE') {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'APPROVED',
          revisionNotes: null,
        },
      });

      // Automatically queue into BullMQ scheduler
      await schedulePost(post.id, post.scheduledFor);

      return NextResponse.json({
        success: true,
        message: 'Post approved and enqueued for publishing!',
        post: updatedPost,
      });
    } else if (action === 'REQUEST_REVISION') {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'REVISION_REQUESTED',
          revisionNotes: clientNote || 'Client requested revisions.',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Revision notes recorded for agency team.',
        post: updatedPost,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
