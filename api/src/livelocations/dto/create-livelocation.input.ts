import { InputType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator'
import { Point } from 'geojson'
import { Pointer } from 'src/locations/entities/pointer.entity'


@InputType()
export class CreateLivelocationInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'User id' })
  idUser: string

  @IsNotEmpty()
  @ValidateNested()
  @Type((type) => Pointer) //indien je in field een type meegeeft heb je de @Type decorator nodig voor validation
  @Field(() => Pointer, { description: 'Geolocation' })
  geolocation: Point
}
