import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from '../birds/entities/bird.entity'
import { DatabaseSeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { CommandModule } from 'nestjs-command' //https://www.npmjs.com/package/nestjs-command
import { Location } from '../locations/entities/location.entity'
import { Observation } from 'src/observations/entities/observation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Bird, Location, Observation]),
    CommandModule,
  ], //<---import CommandModule
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}
