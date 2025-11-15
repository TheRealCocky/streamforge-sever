import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async create(dto: CreateVideoDto) {
    const video = await this.prisma.video.create({
      data: {
        title: dto.title,
        userId: dto.userId,
        status: 'pending',
      },
    });

    await this.kafka.sendMessage('video-processing', {
      videoId: video.id,
      url: dto.originalUrl,
    });

    return video;
  }

  findAll() {
    return this.prisma.video.findMany();
  }
}
