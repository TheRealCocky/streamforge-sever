// video.module.ts
import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { KafkaModule } from '../kafka/kafka.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, KafkaModule, CloudinaryModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}