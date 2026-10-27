export interface PublishPayload {
  accountId: string;
  accessToken: string;
  caption: string;
  mediaUrls: string[];
}

export interface PublishResult {
  success: boolean;
  platformPostId: string;
  permalink?: string;
  rawResponse?: any;
}

export interface SocialAdapter {
  publish(payload: PublishPayload): Promise<PublishResult>;
  validateToken(accessToken: string): Promise<boolean>;
}
