import { NestFactory } from '@nestjs/core';
import { partner1Module } from './partner1.module';

async function bootstrap() {
  const app = await NestFactory.create(partner1Module);
  
  await app.listen(3000);
}

bootstrap();
