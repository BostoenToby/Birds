import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Bird } from '../birds/entities/bird.entity'
import { Repository } from 'typeorm'
import * as jsonBirdsSeed from './data/scraped-birds.json' //tsconfig "resolveJsonModule": true,
import { plainToInstance } from 'class-transformer' //https://www.npmjs.com/package/class-transformer

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Bird)
    private birdsRepository: Repository<Bird>,
  ) {}

  async addAllBirds(): Promise<Bird[]> {
    let theBirds: Bird[] = [];
    //@ts-ignore
    for (let jsonb of jsonBirdsSeed) {
      //let b = plainToInstance(Bird, jsonb); //NIET GEBRUIKEN OMDAT ER NOG MEER PROPERTIES INZITTEN DAN WE NODIG HEBBEN --> MAPT ALLES AUTOMATISCH
      const b = new Bird();
      b.name = jsonb.name;
      b.fullname = jsonb.fullName;
      b.category = jsonb.category;
      b.observations = 0;
      b.url = jsonb.url;
      b.description = jsonb.description;

      theBirds.push(b);
    }

    return this.birdsRepository.save(theBirds);
  }

  async deleteAllBirds(): Promise<void> {
    await this.birdsRepository.delete({})
    return Promise.resolve()
  }
}