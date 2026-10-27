import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redisConnection } from '@/lib/queue/redis';

export async function GET() {
  const status: Record<string, any> = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'CHECKING',
    redis: 'CHECKING',
  };

  // Test Database Connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    status.database = 'CONNECTED';
  } catch (err: any) {
    status.database = `DISCONNECTED (${err.message})`;
  }

  // Test Redis Connection
  try {
    const pong = await Promise.race([
      redisConnection.ping(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000)),
    ]);
    status.redis = pong === 'PONG' ? 'CONNECTED' : 'DISCONNECTED';
  } catch (err: any) {
    status.redis = `DISCONNECTED (${err.message})`;
  }

  const isHealthy = status.database === 'CONNECTED';

  return NextResponse.json(status, {
    status: isHealthy ? 200 : 503,
  });
}
