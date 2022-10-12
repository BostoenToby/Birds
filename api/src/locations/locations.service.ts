import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { Location } from './entities/location.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  create(createLocationInput: CreateLocationInput) {
    const location = new Location()
    location.name = createLocationInput.name
    location.area = createLocationInput.area
    // location.observationsId = createLocationInput.observationsId
    // location.location = createLocationInput.location
    return this.locationRepository.save(location)
  }

  findAll(): Promise<Location[]> {
    return this.locationRepository.find()
  }

  async findOne(id: string): Promise<Location> {
    console.log("finding location", id)
    return this.locationRepository.findOneBy(new ObjectId(id))
  }

  update(updateLocationInput: UpdateLocationInput) {
    const update = new Location()
    update.id = new ObjectId(updateLocationInput.id)
    update.name = updateLocationInput.name
    update.area = updateLocationInput.area
    // update.observationsId = updateLocationInput.observationsId
    // update.location = updateLocationInput.location
    return this.locationRepository.save(update)
  }

  async remove(id: number) {
    const parsedId = new ObjectId(id)
    return this.locationRepository.delete(parsedId)
  }
}
