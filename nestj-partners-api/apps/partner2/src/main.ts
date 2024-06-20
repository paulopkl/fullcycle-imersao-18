import { NestFactory } from '@nestjs/core';
import { partner2Module } from './partner2.module';


async function bootstrap() {
  const app = await NestFactory.create(partner2Module);

  await app.listen(3001);
}

bootstrap();
