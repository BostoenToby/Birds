import { Module } from '@nestjs/common'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'
import { Observation } from './entities/observation.entity'
import { Location } from 'src/locations/entities/location.entity'
import { NotificationsModule } from 'src/notifications/notifications.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Bird, Location, Observation]),
    NotificationsModule, //zodat je aan de gateway kan --> exports in NotificationsModule
  ],
  providers: [
    ObservationsResolver,
    ObservationsService,
    BirdsService,
    LocationsService,
  ],
})
export class ObservationsModule {}
