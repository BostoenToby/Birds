import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ClientMessage {
  @Field(() => String)
  type: string //TODO: make strict enum

  @Field(() => String)
  message: string

  @Field()
  statusCode: number
}
