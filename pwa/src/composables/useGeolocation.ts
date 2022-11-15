import { ref } from "vue"

// geolocation api
export default () => {
    const watchId = ref<number>()

    const _setupGeoLocation = (): boolean => {
        if(!navigator.geolocation){
            console.error('Geolocation is not supported by your browser')
            return false
        }
        return true
    }
    
    // cb heeft een propertie g: GeolocationPosition en returnt {void}
    const startTracking = (cb: (g: GeolocationPosition) => void) => {
        _setupGeoLocation()

        watchId.value = navigator.geolocation.watchPosition(cb)
    }

    return {
        startTracking
    }
}