import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Observation } from './entities/observation.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
  ) {}

  create(createObservationInput: CreateObservationInput) {
    const observation = new Observation()
    observation.name = createObservationInput.name
    observation.userId = createObservationInput.userId
    observation.weather = createObservationInput.weather
    observation.birdId = createObservationInput.birdId
    observation.locationId = createObservationInput.locationId
    observation.description = createObservationInput.description
    observation.active = createObservationInput.active
    observation.geolocation = createObservationInput.geolocation
    return this.observationRepository.save(observation)
  }

  findAll(): Promise<Observation[]> {
    return this.observationRepository.find()
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOneBy(
      new ObjectId(id),
    )
  }

  update(updateObservationInput: UpdateObservationInput) {
    const update = new Observation()
    update.id = new ObjectId(updateObservationInput.id)
    update.name = updateObservationInput.name
    update.userId = updateObservationInput.userId
    update.weather = updateObservationInput.weather
    update.birdId = updateObservationInput.birdId
    update.description = updateObservationInput.description
    update.locationId = updateObservationInput.locationId
    update.active = updateObservationInput.active
    update.geolocation = updateObservationInput.geolocation
    return this.observationRepository.save(update)
  }

  async remove(id: string): Promise<DeleteResult> {
    const parsedId = new ObjectId(id)
    return this.observationRepository.delete(parsedId)
  }
}
