import { Injectable } from '@nestjs/common';
import { CreateObservationInput } from './dto/create-observation.input';
import { UpdateObservationInput } from './dto/update-observation.input';

@Injectable()
export class ObservationService {
  create(createObservationInput: CreateObservationInput) {
    return 'This action adds a new observation';
  }

  findAll() {
    return `This action returns all observation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observation`;
  }

  update(id: number, updateObservationInput: UpdateObservationInput) {
    return `This action updates a #${id} observation`;
  }

  remove(id: number) {
    return `This action removes a #${id} observation`;
  }
}
