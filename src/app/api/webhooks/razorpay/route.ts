import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpayWebhookSignature } from '@/lib/billing/razorpay';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_webhook_secret';

    if (signature && !verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret)) {
      console.warn('[Razorpay Webhook] Invalid signature rejected.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log(`[Razorpay Webhook] Received event: ${event.event}`);

    switch (event.event) {
      case 'subscription.charged':
      case 'subscription.activated': {
        const sub = event.payload?.subscription?.entity;
        const agencySlug = sub?.notes?.agencySlug;
        const planTier = sub?.notes?.planTier || 'GROWTH';

        if (agencySlug) {
          await prisma.agency.update({
            where: { slug: agencySlug },
            data: {
              planTier,
              razorpaySubId: sub.id,
            },
          });
          console.log(`[Razorpay] Upgraded agency ${agencySlug} to tier: ${planTier}`);
        }
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.halted': {
        const sub = event.payload?.subscription?.entity;
        const agencySlug = sub?.notes?.agencySlug;

        if (agencySlug) {
          await prisma.agency.update({
            where: { slug: agencySlug },
            data: { planTier: 'STARTER' },
          });
          console.log(`[Razorpay] Downgraded agency ${agencySlug} to STARTER`);
        }
        break;
      }

      default:
        console.log(`[Razorpay] Ignored unhandled event: ${event.event}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
