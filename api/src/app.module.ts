import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { BirdsModule } from './birds/birds.module'
import { LocationsModule } from './locations/locations.module'
import { ObservationsModule } from './observations/observations.module'
import { DatabaseSeedModule } from './seed/seed.module'

@Module({
  imports: [
    BootstrapModule,
    BirdsModule,
    LocationsModule,
    ObservationsModule,
    DatabaseSeedModule,
  ], //TODO: Enchancement? Move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
