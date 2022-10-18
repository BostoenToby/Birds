import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { BirdsModule } from './birds/birds.module'
import { LocationsModule } from './locations/locations.module'
import { ObservationsModule } from './observations/observations.module'
import { DatabaseSeedModule } from './seed/seed.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LivelocationsModule } from './livelocations/livelocations.module'
import { NotificationsModule } from './notifications/notifications.module'
import { NotificationsGateway } from './notifications/notifications.gateway'

@Module({
  imports: [
    BootstrapModule,
    BirdsModule,
    LocationsModule,
    ObservationsModule,
    DatabaseSeedModule,
    AuthModule,
    UsersModule,
    LivelocationsModule,
    NotificationsModule
  ], //TODO: Enchancement? Move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
