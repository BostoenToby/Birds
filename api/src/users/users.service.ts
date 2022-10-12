import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb'
import { MessageTypes } from 'src/bootstrap/entities/ClientMessage';
import { ClientMessage } from 'src/entities/ClientMessage';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return this.userRepository.findOne(new ObjectId(id))
  }

  update(updateUserInput: UpdateUserInput) {
    const update = new User()
    update.id = new ObjectId(updateUserInput.id)
    update.uid = updateUserInput.uid
    update.observations = updateUserInput.observations
    update.observationsCount = updateUserInput.observationsCount
    return this.userRepository.save(update)
  }

  remove(id: string) {
  return this.userRepository.delete(new ObjectId(id))
  }
}
