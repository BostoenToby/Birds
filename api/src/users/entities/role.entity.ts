import {
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql'

@InputType('RoleInput')
@ObjectType()
export class Role {
  @Field(() => String)
  name: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
