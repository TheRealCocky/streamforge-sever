import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Module({
  providers: [
    {
      provide: 'KAFKA_ENABLED',
      useValue: process.env.KAFKA_ENABLED !== 'false', // Render = false
    },
    {
      provide: KafkaService,
      useFactory: (enabled: boolean) => new KafkaService(enabled),
      inject: ['KAFKA_ENABLED'],
    },
  ],
  exports: [KafkaService],
})
export class KafkaModule {}


