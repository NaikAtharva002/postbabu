import { PlatformType } from '@prisma/client';
import { SocialAdapter } from './types';
import { InstagramAdapter } from './instagram';
import { LinkedInAdapter } from './linkedin';

export class SocialAdapterFactory {
  private static adapters: Map<PlatformType, SocialAdapter> = new Map();

  static getAdapter(platform: PlatformType): SocialAdapter {
    if (!this.adapters.has(platform)) {
      switch (platform) {
        case 'INSTAGRAM':
        case 'FACEBOOK_PAGE':
          this.adapters.set(platform, new InstagramAdapter());
          break;
        case 'LINKEDIN':
          this.adapters.set(platform, new LinkedInAdapter());
          break;
        default:
          throw new Error(`Unsupported platform adapter: ${platform}`);
      }
    }

    return this.adapters.get(platform)!;
  }
}
