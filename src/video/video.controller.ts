import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import type { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

interface JwtRequest extends Request {
  user: { userId: string; email: string };
}

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Endpoint para upload de vídeo
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Req() req: JwtRequest,
  ) {
    const userId = req.user.userId;
    return this.videoService.uploadVideo(file, title, userId);
  }

  // Endpoint para buscar todos os vídeos de um usuário
  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async findAllByUser(@Req() req: JwtRequest) {
    const userId = req.user.userId;
    return this.videoService.findAllByUser(userId);
  }

  // Endpoint para buscar todos os vídeos (opcional)
  @Get()
  findAll() {
    return this.videoService.findAll();
  }
}

