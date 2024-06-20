import { Module } from '@nestjs/common';
// import { SpotsService } from './spots.service';
import { LugaresController } from './lugares.controller';
import { SpotsCoreModule } from '@app/core/spots/spots-core.module';

@Module({
  imports: [SpotsCoreModule],
  controllers: [LugaresController],
  // providers: [SpotsService],
})
export class LugaresModule {}
