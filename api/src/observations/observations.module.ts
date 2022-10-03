import { Module } from '@nestjs/common'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'
import { Observation } from './entities/observation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Bird, Location, Observation]),
  ],
  providers: [
    ObservationsResolver,
    ObservationsService,
    BirdsService,
    LocationsService,
  ],
})
export class ObservationsModule {}
