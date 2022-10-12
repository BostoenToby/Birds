import { InputType, Int, Field } from '@nestjs/graphql';
import { Observation } from 'src/observations/entities/observation.entity';

@InputType()
export class CreateUserInput {
  @Field()
  uid: string
}
