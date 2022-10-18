import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from 'src/observations/entities/observation.entity';
import { Livelocation } from 'src/livelocations/entities/livelocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Livelocation, Observation])],
  providers: [LocationsResolver, LocationsService]
})
export class LocationsModule {}
