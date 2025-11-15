import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() dto: CreateVideoDto) {
    return this.videoService.create(dto);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }
}

