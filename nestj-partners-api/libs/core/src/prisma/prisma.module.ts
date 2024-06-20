import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Eu quero uma conexão apenas, não várias conexões com o banco
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
