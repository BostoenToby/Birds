import { CreateBirdInput } from "../dto/create-bird.input";
import { Bird } from "../entities/bird.entity";

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
    bird.id = 'abc123'
    bird.name = "bird"
    bird.fullname = "bird"
    bird.category = "bird"
    bird.url = "bird"
    bird.observations = 2
    bird.description = "bird" //is optioneel dus MOET er niet bij 
    return bird
}