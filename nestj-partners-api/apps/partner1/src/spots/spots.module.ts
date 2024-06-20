import { Module } from '@nestjs/common';
// import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { SpotsCoreModule } from '@app/core/spots/spots-core.module';

@Module({
  imports: [SpotsCoreModule],
  controllers: [SpotsController],
  // providers: [SpotsService],
})
export class SpotsModule {}
