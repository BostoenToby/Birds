import { InputType, Int, Field } from '@nestjs/graphql';
import { Observation } from 'src/observations/entities/observation.entity';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string

  // @Field(() => Observation)
  // observations: Observation[]
  @Field()
  observationsId: string

  @Field()
  location: string
}
