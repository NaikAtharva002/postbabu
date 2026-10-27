import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisConnection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy(times) {
    // Exponential backoff up to 10 seconds
    const delay = Math.min(times * 1000, 10000);
    return delay;
  },
});

let loggedRefused = false;
redisConnection.on('error', (err: any) => {
  if (err.code === 'ECONNREFUSED') {
    if (!loggedRefused) {
      console.warn('⚠️ [Redis Notice] Redis is not reachable at ' + redisUrl + '. BullMQ queue will retry when Redis is active.');
      loggedRefused = true;
    }
    return;
  }
  console.warn('[Redis Error]:', err.message);
});

redisConnection.on('connect', () => {
  loggedRefused = false;
  console.log('✅ [Redis] Connected successfully to ' + redisUrl);
});
