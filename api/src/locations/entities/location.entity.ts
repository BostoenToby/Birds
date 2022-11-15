import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm'
import { Observation } from 'src/observations/entities/observation.entity'
import { ObjectId } from 'mongodb'
import { Polygon } from 'geojson'
import { Area } from './area.entity'

@Entity()
@ObjectType()
export class Location {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Area)
  @Column({ nullable: true, type: 'simple-json' })
  area: Polygon

  // @Field()
  // @Column()
  // observationsId: string

  @Field(() => [Observation], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  observations: Observation[]

  // @Field()
  // @Column()
  // location: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
