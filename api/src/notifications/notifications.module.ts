import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { Location } from 'src/locations/entities/location.entity'
import { LocationsService } from 'src/locations/locations.service'
import { NotificationsGateway } from './notifications.gateway'

@Module({
  imports: [
    TypeOrmModule.forFeature([Livelocation, Location]),
  ],
  providers: [
    NotificationsGateway,
    LocationsService,
    LivelocationsService,
  ],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
