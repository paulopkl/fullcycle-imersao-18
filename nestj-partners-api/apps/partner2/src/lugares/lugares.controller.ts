import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsService } from '@app/core/spots/spots.service';
import { CriarLugarRequest } from './request/criar-lugar.request';
import { AtualizarLugarRequest } from './request/atualizar-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class LugaresController {
  constructor(private readonly lugaresService: SpotsService) {}

  @Post()
  create(
    @Body() criarLugarRequest: CriarLugarRequest,
    @Param('eventoId') eventoId: string,
  ) {
    return this.lugaresService.create({
      name: criarLugarRequest.nome,
      eventId: eventoId,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.lugaresService.findAll(eventoId);
  }

  @Get(':lugarId')
  findOne(@Param('id') lugarId: string, @Param('eventoId') eventoId: string) {
    return this.lugaresService.findOne(eventoId, lugarId);
  }

  @Patch(':lugarId')
  update(
    @Param('id') lugarId: string,
    @Param('eventoId') eventoId: string,
    @Body() atualizarLugarRequest: AtualizarLugarRequest,
  ) {
    return this.lugaresService.update(eventoId, lugarId, {
      name: atualizarLugarRequest.nome,
    });
  }

  @Delete(':lugarId')
  remove(@Param('id') lugarId: string, @Param('eventoId') eventoId: string) {
    return this.lugaresService.remove(eventoId, lugarId);
  }
}
