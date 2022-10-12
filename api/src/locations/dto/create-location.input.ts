import { InputType, Int, Field } from '@nestjs/graphql';
import { Polygon } from 'geojson';
import { Area } from '../entities/area.entity';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string

  // @Field()
  // location: string

  @Field(() => Area)
  area: Polygon
}
