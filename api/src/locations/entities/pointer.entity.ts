import { Field, InputType, ObjectType } from "@nestjs/graphql"
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  Equals,
  IsNotEmpty,
} from 'class-validator'
@InputType('PointerInput')
@ObjectType()
export class Pointer {
  @IsNotEmpty()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @Field((type) => [Number])
  coordinates: number[]

  @IsNotEmpty()
  @Equals('Point')
  @Field()
  type: string
}