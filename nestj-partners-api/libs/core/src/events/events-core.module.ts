import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from '@app/core/prisma/prisma.service';

@Module({
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsCoreModule {}
