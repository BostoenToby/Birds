import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateObservationInput {
  @Field()
  name: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  weather?: string

  @Field()
  @Column()
  birdId: string

  // @Field(() => Bird)
  // bird: Bird

  @Field()
  @Column()
  locationId: string

  // @Field(() => Location)
  // location: Location

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
