import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import type { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// Garante que a pasta de uploads existe
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Endpoint para upload de vídeo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('userId') userId: string,
  ) {
    return this.videoService.uploadVideo(file, title, userId);
  }

  // Endpoint para buscar todos os vídeos
  @Get()
  findAll() {
    return this.videoService.findAll();
  }
}




