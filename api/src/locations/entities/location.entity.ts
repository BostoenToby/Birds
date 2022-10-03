import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Observation } from 'src/observations/entities/observation.entity'

@ObjectType()
export class Location {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string

  @Field(() => String)
  @Column()
  name: string

  @Field()
  @Column()
  observationsId: string

  @Field(() => [Observation])
  @Column({ nullable: true })
  observations: Observation[]

  @Field()
  @Column()
  location: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
