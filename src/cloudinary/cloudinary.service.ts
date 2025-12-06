import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from './cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config(cloudinaryConfig);
  }

  async uploadVideo(filePath: string) {
    return cloudinary.uploader.upload(filePath, { resource_type: 'video' });
  }
}

