import { InputType, Int, Field } from '@nestjs/graphql';
import { Observation } from 'src/observations/entities/observation.entity';
import { Location } from '../entities/location.entity';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string

  @Field()
  observations: Observation[]

  @Field()
  location: string
}
