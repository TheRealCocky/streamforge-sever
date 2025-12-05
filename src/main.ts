import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para todas as origens
  app.enableCors({
    origin: '*', // ou coloque um array com os domínios permitidos, ex: ['https://meusite.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // se precisar enviar cookies
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 StreamForge backend running on http://localhost:${port}`);
}
bootstrap();

