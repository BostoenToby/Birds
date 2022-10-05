import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { Bird } from './entities/bird.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird)
    private readonly birdRepository: Repository<Bird>,
  ) {}

  create(createBirdInput: CreateBirdInput) {
    const bird = new Bird()
    bird.name = createBirdInput.name
    bird.fullname = createBirdInput.fullname
    bird.category = createBirdInput.category
    bird.url = createBirdInput.url
    bird.observations = createBirdInput.observations
    bird.description = createBirdInput.description
    return this.birdRepository.save(bird)
  }

  findAll(): Promise<Bird[]> {
    return this.birdRepository.find()
  }

  findOne(id: string): Promise<Bird> {
    console.log("finding location", id)
    return this.birdRepository.findOne(new ObjectId(id))
  }

  update(updateBirdInput: UpdateBirdInput) {
    const update = new Bird()
    update.id = new ObjectId(updateBirdInput.id)
    update.name = updateBirdInput.name
    update.fullname = updateBirdInput.fullname
    update.category = updateBirdInput.category
    update.url = updateBirdInput.url
    update.observations = updateBirdInput.observations
    update.description = updateBirdInput.description
    return this.birdRepository.save(update) //Save gives us an advantage
  }

  async remove(id: String): Promise<DeleteResult> {
    return this.birdRepository.delete(new ObjectId(id))
  }
}
