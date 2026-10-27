import IORedis from 'ioredis';

const isVercel = !!process.env.VERCEL;
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const isRedisConfigured =
  !!process.env.REDIS_URL && (!isVercel || !process.env.REDIS_URL.includes('localhost'));

export const redisConnection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy(times) {
    // If running on Vercel without a cloud Redis, do not hang on reconnect attempts
    if (isVercel && !isRedisConfigured) {
      return null;
    }
    // Exponential backoff up to 10 seconds
    const delay = Math.min(times * 1000, 10000);
    return delay;
  },
});

let loggedRefused = false;
redisConnection.on('error', (err: any) => {
  if (err.code === 'ECONNREFUSED') {
    if (!loggedRefused) {
      console.warn(
        `⚠️ [Redis Notice] Redis is not reachable at ${redisUrl}. On Vercel, BullMQ runs via Upstash Redis or via Vercel Cron (/api/cron/publish).`
      );
      loggedRefused = true;
    }
    return;
  }
  console.warn('[Redis Error]:', err.message);
});

redisConnection.on('connect', () => {
  loggedRefused = false;
  console.log(`✅ [Redis] Connected successfully to ${redisUrl}`);
});
