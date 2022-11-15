import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { DeleteResult } from 'typeorm'
import { ClientMessage } from '../entities/ClientMessage'
import { MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Bird)
export class BirdsResolver {
  constructor(
    private readonly birdsService: BirdsService,
  ) {}

  @Mutation(() => Bird, {
    description: 'Create a bird using the DTO.',
  })
  createBird(
    @Args('createBirdInput')
    createBirdInput: CreateBirdInput,
  ) {
    return this.birdsService.create(createBirdInput)
  }

  @Query(() => [Bird], { name: 'birds' })
  findAll(): Promise<Bird[]> {
    return this.birdsService.findAll()
  }

  @Query(() => Bird, { name: 'bird' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Bird> {
    return this.birdsService.findOne(id)
  }

  @Mutation(() => Bird)
  updateBird(
    @Args('updateBirdInput')
    updateBirdInput: UpdateBirdInput,
  ): Promise<Bird> {
    return this.birdsService.update(updateBirdInput)
  }

  @Mutation(() => ClientMessage)
  async removeBird(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted: DeleteResult =
      await this.birdsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Bird deleted',
        statusCode: 200,
      }

    return {
      type: 'error',
      message: 'Delete action went very wrong.',
      statusCode: 400,
    }
  }
}
