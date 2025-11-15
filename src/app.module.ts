import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined // ignora arquivos .env em produção
          : ['.env.local', '.env'], // local: prioridade para .env.local, depois .env
    }),

    PrismaModule,
    KafkaModule,
    CloudinaryModule,
    VideoModule,
    UserModule,
    AuthModule,
    NotificationsModule,
  ],
})
export class AppModule {}
