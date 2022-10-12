import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { ObjectId } from 'mongodb'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @Query(() => User, { name: 'user' })
  findByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid)
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput)
  }

  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
  ) {
    return new Promise((resolve) => {
      this.usersService
        .remove(new ObjectId(id))
        .then(() => {
          return {
            code: 200,
            message: `User with id ${id} was deleted`,
            type: MessageTypes.success,
          }
        })
        .catch((error) => {
          resolve({
            code: 400,
            message: `User with id ${id} could not be deleted`,
            type: MessageTypes.error,
          })
        })
    })
  }
}
