import { Queue } from 'bullmq';
import { redisConnection } from './redis';

export const PUBLISHING_QUEUE_NAME = 'social-publishing';

export const publishingQueue = new Queue(PUBLISHING_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 60 * 1000, // 1 min initial retry backoff
    },
    removeOnComplete: {
      age: 24 * 3600, // Keep completed job history for 24h
      count: 1000,
    },
    removeOnFail: false, // Keep failed jobs in DLQ for debugging
  },
});

/**
 * Enqueues a social post for precise future publishing via BullMQ delayed jobs
 */
export async function schedulePost(postId: string, scheduledFor: Date) {
  const delayMs = Math.max(0, scheduledFor.getTime() - Date.now());

  const job = await publishingQueue.add(
    'publish-post',
    { postId },
    {
      jobId: `post-${postId}`,
      delay: delayMs,
    }
  );

  return job;
}

/**
 * Cancels or reschedules an existing queued post
 */
export async function cancelScheduledPost(postId: string) {
  const job = await publishingQueue.getJob(`post-${postId}`);
  if (job) {
    await job.remove();
    return true;
  }
  return false;
}
