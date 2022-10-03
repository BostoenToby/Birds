import { CreateBirdInput } from "../dto/create-bird.input";
import { Bird } from "../entities/bird.entity";
import { ObjectId } from 'mongodb' 

export const createBirdInputStub = (): CreateBirdInput => {
    const bird = new CreateBirdInput()
    bird.name = "bird"
    bird.fullname = "bird"
    bird.category = "bird"
    bird.url = "bird"
    bird.observations = 2
    bird.description = "bird" //is optioneel dus MOET er niet bij 
    return bird
}

export const createBird = (): Bird => {
    const bird = new Bird()
    bird.id = new ObjectId('d89a0bA4cc619d347024f42e')
    bird.name = "name"
    bird.fullname = "fullname"
    bird.category = "category"
    bird.url = "url"
    bird.observations = 2
    bird.description = "description" //is optioneel dus MOET er niet bij 
    return bird
}