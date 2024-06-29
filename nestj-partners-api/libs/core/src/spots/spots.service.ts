import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CreateSpotInput = CreateSpotDto & { eventId: string };

@Injectable()
export class SpotsService {
  constructor(private privateService: PrismaService) {}

  async create(createSpotDto: CreateSpotInput) {
    const event = await this.privateService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) throw new Error('Event not found');

    return this.privateService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
      },
    });
  }

  findAll(eventId: string) {
    return this.privateService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.privateService.spot.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.privateService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.privateService.spot.delete({
      where: {
        id: spotId,
        eventId,
      },
    });
  }
}
