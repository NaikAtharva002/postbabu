import { SocialAdapter, PublishPayload, PublishResult } from './types';

/**
 * LinkedIn Community Management API v2 Adapter
 */
export class LinkedInAdapter implements SocialAdapter {
  private baseUrl = 'https://api.linkedin.com/v2';

  async publish(payload: PublishPayload): Promise<PublishResult> {
    const { accountId, accessToken, caption, mediaUrls } = payload;

    // Construct LinkedIn UGC Post Payload
    const authorUrn = accountId.startsWith('urn:li:') ? accountId : `urn:li:person:${accountId}`;

    const body: any = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: caption,
          },
          shareMediaCategory: mediaUrls && mediaUrls.length > 0 ? 'IMAGE' : 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    if (mediaUrls && mediaUrls.length > 0) {
      body.specificContent['com.linkedin.ugc.ShareContent'].media = mediaUrls.map((url) => ({
        status: 'READY',
        originalUrl: url,
      }));
    }

    const res = await fetch(`${this.baseUrl}/ugcPosts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`LinkedIn publishing failed: ${JSON.stringify(data)}`);
    }

    return {
      success: true,
      platformPostId: data.id || res.headers.get('x-restli-id') || 'linkedin-post',
      rawResponse: data,
    };
  }

  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
