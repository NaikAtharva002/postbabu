import 'dotenv/config';
import { publishingWorker } from './publishing-worker';

console.log('🚀 [PostBabu Scheduler Worker] Started and listening for BullMQ delayed jobs...');

process.on('SIGTERM', async () => {
  console.log('🛑 [PostBabu Worker] Shutting down gracefully...');
  await publishingWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 [PostBabu Worker] Shutting down gracefully...');
  await publishingWorker.close();
  process.exit(0);
});
