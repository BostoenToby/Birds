import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ObservationService } from './observation.service';
import { Observation } from './entities/observation.entity';
import { CreateObservationInput } from './dto/create-observation.input';
import { UpdateObservationInput } from './dto/update-observation.input';

@Resolver(() => Observation)
export class ObservationResolver {
  constructor(private readonly observationService: ObservationService) {}

  @Mutation(() => Observation)
  createObservation(@Args('createObservationInput') createObservationInput: CreateObservationInput) {
    return this.observationService.create(createObservationInput);
  }

  @Query(() => [Observation], { name: 'observation' })
  findAll() {
    return this.observationService.findAll();
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.observationService.findOne(id);
  }

  @Mutation(() => Observation)
  updateObservation(@Args('updateObservationInput') updateObservationInput: UpdateObservationInput) {
    return this.observationService.update(updateObservationInput.id, updateObservationInput);
  }

  @Mutation(() => Observation)
  removeObservation(@Args('id', { type: () => Int }) id: number) {
    return this.observationService.remove(id);
  }
}
