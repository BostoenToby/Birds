import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ObservationsService } from './observations.service'
import { Observation } from './entities/observation.entity'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'
import { Bird } from 'src/birds/entities/bird.entity'
import { Location } from 'src/locations/entities/location.entity'
import { FirebaseGuard } from 'src/auth/guard/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { Currentuser } from 'src/auth/decorators/user.decorator'
import { NotificationsGateway } from 'src/notifications/notifications.gateway'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdService: BirdsService,
    private readonly locationService: LocationsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @ResolveField() //resolvefield omdat we in de entity enkel een field meegeven en geen column
  bird(@Parent() o: Observation): Promise<Bird> {
    console.log(o)
    return this.birdService.findOne(o.birdId)
  }

  @ResolveField()
  location(@Parent() o: Observation): Promise<Location> {
    console.log(o)
    return this.locationService.findOne(o.locationId)
  }

  @Mutation(() => Observation)
  async createObservation(
    @Args('createObservationInput')
    createObservationInput: CreateObservationInput,
  ) {
    const obs = await this.observationsService.create(createObservationInput)
    const locations = await this.locationService.findLocationByPoint(obs.geolocation)
    if(locations.length > 0){
      // verwittig iedereen in deze room (room per locatie)
      this.notificationsGateway.server.to(locations[0].name).emit('bird:observation', obs)
    }
    return obs
    // return this.observationsService.create(
    //   createObservationInput,
    // )
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Observation], { name: 'observations' })
  findAll(@Currentuser() user) {
    //currentUser --> haalt uit de guard de userId
    console.log(user.uid) //see information of the user that is logged in
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ) {
    return this.observationsService.update(
      updateObservationInput,
    )
  }

  @Mutation(() => Observation)
  removeObservation(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.observationsService.remove(id)
  }
}
