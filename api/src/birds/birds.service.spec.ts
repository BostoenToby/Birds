import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import { createBird, createBirdInputStub } from './stubs/birds.stubs'

describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdRepository: Repository<Bird>

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          BirdsService,
          {
            provide: getRepositoryToken(Bird),
            useValue: {
              save: jest.fn().mockResolvedValue(createBird()), //maak een mock functie --> je wil de functie save niet testen van "typeorm"
            },
          },
        ],
      }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create is called', () => {
      it('should call the bird repository save method', async() => {
        const newBird = new Bird()
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')

        await service.create(newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })
      it('should be called with the correct params', async() => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = createBirdInputStub() // function that creates bird with input
        await service.create(newBird)
        expect(saveSpy).toBeCalledWith(newBird) //stel je geeft een lege property mee in de service --> fout omdat je niet dezelfde properties meegeeft in stub als in service 
      })
      it('should return the created bird', async() => {
        const newBird = createBirdInputStub()
        const toReturnBird = createBird()

        const result = await service.create(newBird)
        expect(result).toEqual(toReturnBird)
      })
    })
  })
})
