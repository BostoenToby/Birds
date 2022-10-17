import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { Observation } from 'src/observations/entities/observation.entity'

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  uid: string

  @Field(() => [Observation], { nullable: 'itemsAndList' }) //in graphql --> can return []
  @Column({ nullable: true, default: [] }) //typeorm
  observations: Observation[]

  @Field(() => Int, { nullable: true })
  @Column()
  observationsCount?: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
