import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}

