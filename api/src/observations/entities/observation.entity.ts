import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { Bird } from 'src/birds/entities/bird.entity'
import { Location } from 'src/locations/entities/location.entity'

@Entity()
@ObjectType()
export class Observation {
  // Field is om te queryen in graphql
  // Column is voor mongo --> typeorm
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field(() => String)
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  weather?: string

  @Field(() => Bird)
  bird: Bird

  @Column()
  birdId: string

  @Field(() => Location)
  location: Location

  @Column() 
  locationId: string

  @Field({ nullable: true })
  @Column()
  description?: string

  @Field({ nullable: true })
  @Column()
  active?: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
