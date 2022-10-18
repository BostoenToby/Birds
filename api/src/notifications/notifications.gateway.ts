import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { LocationsService } from 'src/locations/locations.service'
import { WsException } from '@nestjs/websockets/errors'
import { Server, Socket } from 'socket.io'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidation'

@WebSocketGateway(3004)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients: number = 0

  @UsePipes(new MyWebSocketValidationPipe()) // voor validatie
  @SubscribeMessage('birdspotter:moving')
  async handleBirdspotterMoving(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log('data', data)
    const liveLoc = await this.livelocationsService.create(
      data,
    )
    const l =
      await this.locationsService.findLocationByPoint(
        liveLoc.geolocation,
      )
    if (l.length > 0) {
      console.log('in a known area/location')
      console.log(l[0].name)
      console.log(`Rooms of this client:`, client.rooms)
      client.join(l[0].name)
      console.log(`Rooms of this client:`, client.rooms)
      // this.server.emit('birdspotter:newLocation', liveLoc)
      this.server.to(l[0].name).emit('birdspotter:newlocation', liveLoc)
    } else {
      console.log('not in a known area/location')
    }

    // this.server.emit('birdspotter:newlocation', data) //send to all clients including the one that sent the message
    //client.broadcast.emit('birdspotter:newlocation', data) //to all but the sender
    return Promise.resolve(liveLoc)
  }

  handleDisconnect(client: any) {
    this.numberOfClients--
    this.server.emit('users:userleaving', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has left')
    console.log(
      `Number of clients: ${this.numberOfClients}`,
    )
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnected', {
      connectedUsers: this.numberOfClients,
    })
    // voeg listener user:newuserconnected toe in postman om te luisteren hierop
    console.log('A client has connected')
    console.log(
      `Number of clients: ${this.numberOfClients}`,
    )
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    throw new WsException('Method not implemented')
  }
}
