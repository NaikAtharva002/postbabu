export interface SendApprovalWhatsAppParams {
  clientPhone: string;
  clientName: string;
  agencyName: string;
  postCount: number;
  magicToken: string;
}

/**
 * Sends a WhatsApp approval link directly to an Indian client's phone number
 */
export async function sendWhatsAppApprovalNotification(params: SendApprovalWhatsAppParams) {
  const { clientPhone, clientName, agencyName, postCount, magicToken } = params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const reviewUrl = `${appUrl}/review/${magicToken}`;

  const messageText = `Namaste ${clientName}! 🙏\n\n${agencyName} has prepared ${postCount} new social media post(s) for your approval.\n\n👉 Review & approve in 1 tap (no password required):\n${reviewUrl}\n\nValid for 72 hours.`;

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId || token === 'your-whatsapp-cloud-api-token') {
    console.log('\n--- [MOCK WHATSAPP NOTIFICATION DISPATCHED] ---');
    console.log(`To: +91 ${clientPhone}`);
    console.log(`Content:\n${messageText}`);
    console.log('-----------------------------------------------\n');
    return { success: true, mocked: true, reviewUrl };
  }

  // Meta WhatsApp Cloud API integration
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: clientPhone.replace(/\D/g, ''),
        type: 'text',
        text: { body: messageText },
      }),
    });

    const data = await res.json();
    return { success: res.ok, data, reviewUrl };
  } catch (err: any) {
    console.error('[WhatsApp Cloud API Error]:', err.message);
    return { success: false, error: err.message, reviewUrl };
  }
}
