import { prisma } from '../db';
import crypto from 'crypto';

/**
 * Creates or retrieves a 72-hour valid magic review link token for a client workspace
 */
export async function generateClientApprovalToken(workspaceId: string): Promise<string> {
  const token = 'tok_' + crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now

  await prisma.approvalToken.create({
    data: {
      token,
      workspaceId,
      expiresAt,
    },
  });

  return token;
}

/**
 * Verifies if an approval token is valid and unexpired
 */
export async function verifyApprovalToken(token: string) {
  const approval = await prisma.approvalToken.findUnique({
    where: { token },
    include: {
      workspace: {
        include: {
          agency: true,
          posts: {
            where: {
              status: {
                in: ['PENDING_APPROVAL', 'REVISION_REQUESTED', 'APPROVED'],
              },
            },
            include: {
              channels: {
                include: { socialAccount: true },
              },
            },
            orderBy: { scheduledFor: 'asc' },
          },
        },
      },
    },
  });

  if (!approval) {
    return { valid: false, reason: 'TOKEN_NOT_FOUND' };
  }

  if (new Date() > approval.expiresAt) {
    return { valid: false, reason: 'TOKEN_EXPIRED' };
  }

  return { valid: true, workspace: approval.workspace };
}
