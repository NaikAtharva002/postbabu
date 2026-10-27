import { SocialAdapter, PublishPayload, PublishResult } from './types';

/**
 * Meta Graph API Instagram Publishing Adapter
 * Follows Meta's mandatory 2-step Container Publish Protocol
 */
export class InstagramAdapter implements SocialAdapter {
  private apiVersion = 'v21.0';
  private baseUrl = `https://graph.facebook.com/${this.apiVersion}`;

  async publish(payload: PublishPayload): Promise<PublishResult> {
    const { accountId, accessToken, caption, mediaUrls } = payload;

    if (!mediaUrls || mediaUrls.length === 0) {
      throw new Error('Instagram requires at least one media asset (image or video)');
    }

    const mediaUrl = mediaUrls[0];
    const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.includes('video');

    // Step 1: Create IG Media Container
    const containerParams = new URLSearchParams({
      caption,
      access_token: accessToken,
    });

    if (isVideo) {
      containerParams.append('media_type', 'REELS');
      containerParams.append('video_url', mediaUrl);
    } else {
      containerParams.append('image_url', mediaUrl);
    }

    const containerRes = await fetch(
      `${this.baseUrl}/${accountId}/media?${containerParams.toString()}`,
      { method: 'POST' }
    );

    const containerData = await containerRes.json();
    if (!containerRes.ok || !containerData.id) {
      throw new Error(
        `Failed to create Instagram container: ${JSON.stringify(containerData.error || containerData)}`
      );
    }

    const containerId = containerData.id;

    // Step 2: Poll Container Status until ready (required for videos/reels and high-res images)
    await this.pollContainerStatus(containerId, accessToken);

    // Step 3: Publish the Media Container
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishRes = await fetch(
      `${this.baseUrl}/${accountId}/media_publish?${publishParams.toString()}`,
      { method: 'POST' }
    );

    const publishData = await publishRes.json();
    if (!publishRes.ok || !publishData.id) {
      throw new Error(
        `Failed to publish Instagram container: ${JSON.stringify(publishData.error || publishData)}`
      );
    }

    return {
      success: true,
      platformPostId: publishData.id,
      rawResponse: publishData,
    };
  }

  private async pollContainerStatus(
    containerId: string,
    accessToken: string,
    maxRetries = 10
  ): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      const res = await fetch(
        `${this.baseUrl}/${containerId}?fields=status_code&access_token=${accessToken}`
      );
      const data = await res.json();

      if (data.status_code === 'FINISHED') {
        return;
      }
      if (data.status_code === 'ERROR' || data.status_code === 'EXPIRED') {
        throw new Error(`Instagram container failed processing with status: ${data.status_code}`);
      }

      // Wait 3 seconds before next check
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/me?access_token=${accessToken}`);
      return res.ok;
    } catch {
      return false;
    }
  }
}
