import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateObservationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
