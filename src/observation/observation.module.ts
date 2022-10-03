import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationResolver } from './observation.resolver';

@Module({
  providers: [ObservationResolver, ObservationService]
})
export class ObservationModule {}
