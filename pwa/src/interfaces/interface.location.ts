import Observation from "./interface.observation"

export default interface location {
    id: string
    name: string
    observations: Observation[]
    location: string
    createdAt?: Date
    updatedAt?: Date
}