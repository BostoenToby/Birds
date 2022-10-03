import { GqlModuleOptions } from "@nestjs/graphql";
import { ApolloDriver } from '@nestjs/apollo'

export const graphqlConfig: GqlModuleOptions = {
    driver: ApolloDriver,
    sortSchema: true,
    autoSchemaFile: true,
}