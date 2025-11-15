import { Kafka } from 'kafkajs';
import * as ffmpeg from 'fluent-ffmpeg';
import { PrismaClient } from '@prisma/client';

const kafka = new Kafka({
  clientId: 'video-processor',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'video-processing-group' });
const prisma = new PrismaClient();

async function processVideos() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'video-uploads', fromBeginning: false });

  console.log('🎥 Video processor worker started...');

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        console.warn('⚠️ Received message without value, skipping...');
        return;
      }

      try {
        const { videoId, url } = JSON.parse(message.value.toString());

        console.log(`Processing video: ${videoId}`);

        // Simula processamento com FFmpeg
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const processedUrl = url + '?processed=true'; // simulação

        await prisma.video.update({
          where: { id: videoId },
          data: { status: 'processed', url: processedUrl },
        });

        console.log(`✅ Video processed: ${videoId}`);
      } catch (err) {
        console.error('❌ Error processing video:', err);
      }
    },
  });
}

processVideos().catch(console.error);
