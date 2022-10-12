import { Field, InputType, ObjectType } from "@nestjs/graphql"

@InputType('PointerInput')
@ObjectType()
export class Pointer {
  @Field((type) => [Number])
  coordinates: number[]
  @Field()
  type: string
}