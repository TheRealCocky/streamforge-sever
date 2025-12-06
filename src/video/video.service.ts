import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';
import * as fs from 'fs';

@Injectable()
export class VideoService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private cloudinary: CloudinaryService,
  ) {}

  // Upload do vídeo
  async uploadVideo(file: Express.Multer.File, title: string, userId: string) {
    if (!file) throw new Error('Arquivo de vídeo é obrigatório');

    // Upload para o Cloudinary
    const uploadResult = await this.cloudinary.uploadVideo(file.path);

    // Remove o arquivo temporário
    fs.unlinkSync(file.path);

    // Salva no banco de dados
    const video = await this.prisma.video.create({
      data: {
        title,
        userId,
        status: 'pending',
        url: uploadResult.secure_url, // usa campo url do schema
      },
    });

    // Envia mensagem para Kafka para processamento
    await this.kafka.sendMessage('video-processing', {
      videoId: video.id,
      url: uploadResult.secure_url,
    });

    return video;
  }

  // Busca todos os vídeos
  findAll() {
    return this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
