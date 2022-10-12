import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from 'src/observations/entities/observation.entity';
import { ObservationsService } from 'src/observations/observations.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Observation])], //door injectrepository
  providers: [UsersResolver, UsersService, ObservationsService]
})
export class UsersModule {}
