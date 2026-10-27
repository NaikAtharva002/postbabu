import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { schedulePost } from '@/lib/queue/publishing-queue';

/**
 * Meta WhatsApp Cloud API Webhook Verification (GET)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'postbabu_wa_verify_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp Webhook] Handshake verified successfully.');
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

/**
 * Handles Inbound WhatsApp Messages from Clients (POST)
 * Enables 2-Way Approvals: Client texts "YES" or "APPROVE" to approve pending posts!
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message || message.type !== 'text') {
      return NextResponse.json({ status: 'ignored' });
    }

    const fromPhone = message.from; // e.g. "919876543210"
    const text = (message.text?.body || '').trim();

    console.log(`[WhatsApp Inbound] Received from +${fromPhone}: "${text}"`);

    // Match client workspace by registered phone number
    const workspace = await prisma.clientWorkspace.findFirst({
      where: {
        clientPhone: {
          contains: fromPhone.slice(-10), // Match last 10 digits
        },
      },
      include: {
        posts: {
          where: { status: 'PENDING_APPROVAL' },
          orderBy: { scheduledFor: 'asc' },
          take: 1,
        },
      },
    });

    if (!workspace || workspace.posts.length === 0) {
      console.log('[WhatsApp Webhook] No pending post found for this phone number.');
      return NextResponse.json({ status: 'no_pending_post' });
    }

    const pendingPost = workspace.posts[0];
    const normalizedText = text.toUpperCase();

    if (
      normalizedText === 'YES' ||
      normalizedText === 'APPROVE' ||
      normalizedText === 'APPROVED' ||
      normalizedText === 'HAAN' ||
      normalizedText === 'OK'
    ) {
      // Mark post approved in database
      await prisma.post.update({
        where: { id: pendingPost.id },
        data: { status: 'APPROVED', revisionNotes: null },
      });

      // Schedule into BullMQ
      await schedulePost(pendingPost.id, pendingPost.scheduledFor);
      console.log(`[WhatsApp Webhook] Post ${pendingPost.id} approved via WhatsApp reply!`);
    } else {
      // Treat as revision note
      await prisma.post.update({
        where: { id: pendingPost.id },
        data: {
          status: 'REVISION_REQUESTED',
          revisionNotes: `WhatsApp Feedback: ${text}`,
        },
      });
      console.log(`[WhatsApp Webhook] Revision note recorded for Post ${pendingPost.id}`);
    }

    return NextResponse.json({ status: 'processed' });
  } catch (err: any) {
    console.error('[WhatsApp Webhook Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
