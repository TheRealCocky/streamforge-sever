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

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Endpoint para upload de vídeo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
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



