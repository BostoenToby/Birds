// npm i socket.io-client -w pwa

import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'
import LiveLocation from '../interfaces/interface.live-location'
import useCustomerUser from './useCustomerUser'
import useGeolocation from './useGeolocation'

// SHARED

const socketServer = ref<Socket>()
let socketTest: Socket
const connected = ref<boolean>(false)

export default () => {
  // FOR EACH INSTANCE

    const { startTracking } = useGeolocation()
    const { customUser } = useCustomerUser()

  // degene met '_' ervoor nooit beschikbaar maken voor de users!
  const _connect = () => {
    console.log('Connected')
    connected.value = true

    startTracking((p: GeolocationPosition) => {
        console.log(customUser)
        const payload: LiveLocation = {
            idUser: customUser.value!.id!,
            geolocation: {
                type: 'Point',
                coordinates: [p.coords.longitude, p.coords.latitude]
            }
        }
        socketServer.value!.emit('birdspotter:moving', payload)
    })
  }

  const _disconnect = () => {
    console.log('Disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.error(error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value){
        socketServer.value.disconnect()
        socketServer.value = undefined
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
      // indien er al een server bestaat
    }

    socketServer.value = io('ws://[::1]:3003', {
      transports: ['websocket'], //polling is default, can give cors errors
      reconnectionDelay: 10000,
    })
    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }
  return {
    connected,

    connectToServer,
    disconnectFromServer,
  }
}
