import { Module } from '@nestjs/common'
import { typeORMConfig } from './bootstrap/typeORMconfig'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlConfig } from './bootstrap/graphQLConfig'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { BirdsModule } from './birds/birds.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(
      graphqlConfig,
    ),
    BirdsModule,
  ], //TODO: Enchancement? Move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
