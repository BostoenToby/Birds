import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType('AreaInput') //indien je deze niet invult 'AreaInput' krijg je een fout dat area niet uniek is
@ObjectType()
export class Area {
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @Field()
  type: string
}
