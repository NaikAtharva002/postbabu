import crypto from 'crypto';

export interface RazorpayPlan {
  id: string;
  name: string;
  priceInRupees: number;
  period: 'monthly' | 'yearly';
  interval: number;
  clientWorkspaceLimit: number;
}

export const RAZORPAY_PLANS: Record<string, RazorpayPlan> = {
  STARTER: {
    id: 'plan_starter_inr',
    name: 'Chota Agency (Starter)',
    priceInRupees: 499,
    period: 'monthly',
    interval: 1,
    clientWorkspaceLimit: 3,
  },
  GROWTH: {
    id: 'plan_growth_inr',
    name: 'Agency Pro (Growth)',
    priceInRupees: 1299,
    period: 'monthly',
    interval: 1,
    clientWorkspaceLimit: 10,
  },
  SCALE: {
    id: 'plan_scale_inr',
    name: 'Agency Scale (Unlimited)',
    priceInRupees: 2499,
    period: 'monthly',
    interval: 1,
    clientWorkspaceLimit: 999,
  },
};

/**
 * Verifies Razorpay Webhook HMAC-SHA256 Signature
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch (err) {
    return false;
  }
}
