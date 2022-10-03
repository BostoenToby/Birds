import { Module } from '@nestjs/common'
import { typeORMConfig } from './bootstrap/typeORMconfig'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlConfig } from './bootstrap/graphQLConfig'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { BirdsModule } from './birds/birds.module'
import { LocationsModule } from './locations/locations.module'
import { ObservationsModule } from './observations/observations.module'
import { DatabaseSeedModule } from './seed/seed.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(
      graphqlConfig,
    ),
    BirdsModule,
    LocationsModule,
    ObservationsModule,
    DatabaseSeedModule,
  ], //TODO: Enchancement? Move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
