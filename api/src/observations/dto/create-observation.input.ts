import { InputType, Int, Field } from '@nestjs/graphql';
import { Bird } from 'src/birds/entities/bird.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Column } from 'typeorm';

@InputType()
export class CreateObservationInput {
  @Field()
  name: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  weather?: string

  @Column()
  birdId: string

  // @Field(() => Bird)
  // bird: Bird

  @Column()
  locationId: string

  // @Field(() => Location)
  // location: Location

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
