import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBirdInput {
  @Field() // GraphQL
  name: string;

  @Field() // GraphQL
  fullname: string;

  @Field() // GraphQL
  category: string;

  @Field() // GraphQL
  url: string;

  @Field({ defaultValue: 0 }) // GraphQL
  observations: number;

  @Field({ nullable: true }) // GraphQL
  description?: string;
}