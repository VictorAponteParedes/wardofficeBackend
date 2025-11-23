// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);

  console.log(`Aplicación corriendo en: http://localhost:${port}/api`);
  console.log(`Swagger (cuando lo agreguemos): http://localhost:${port}/api/docs`);
}

bootstrap();