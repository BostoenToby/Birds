import { Test, TestingModule } from '@nestjs/testing'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import {
  createBird,
  createBirdInputStub,
} from './stubs/birds.stubs'
import { ObjectId } from 'mongodb'
import { MessageTypes } from '../../src/bootstrap/entities/ClientMessage'
import { ClientMessage } from 'src/entities/ClientMessage'

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let service: BirdsService
  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          BirdsResolver,
          //BirdsService,
          {
            provide: BirdsService,
            useValue: {
              create: jest
                .fn()
                .mockResolvedValue(createBird()),
              findAll: jest
                .fn()
                .mockResolvedValue([createBird()]),
              findOne: jest
                .fn()
                .mockResolvedValue(createBird()),
              update: jest
                .fn()
                .mockResolvedValue(createBird()),
              remove: jest
                .fn()
                .mockResolvedValue({ affected: 1 }),
            },
          },
        ],
      }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    service = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    let createBirdDTO: CreateBirdInput
    let resultBird: Bird

    beforeEach(async () => {
      createBirdDTO = createBirdInputStub()
      resultBird = await resolver.createBird(createBirdDTO)
    })

    describe('when createBird is called', () => {
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })
      it('should return the created bird', async () => {
        //result of the resolver is equal to the result of the mocked service
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  describe('findAll', () => {
    let resultBirds: Bird[]
    beforeEach(async () => {
      resultBirds = await resolver.findAll()
    })

    describe('when findAll is called', () => {
      it('should call birdsService.findAll', async () => {
        expect(service.findAll).toBeCalledTimes(1)
        // could use it.todo() if you need to work this out
        // Remark: Bird[] == [Bird]
      })
      it('should return some birds', async () => {
        expect(resultBirds).toEqual([createBird()])
      })
    })
  })

  describe('findOne', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.findOne(createBird().id)
    })

    describe('When findOne is called', () => {
      it('should call birdsService.findOne', async () => {
        expect(service.findOne).toBeCalledTimes(1)
      })
      it('should call birdsService.findOne with the correct params', async () => {
        expect(service.findOne).toBeCalledWith(
          createBird().id,
        )
      })
      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  describe('update', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.updateBird(createBird())
    })

    describe('when updateBird is called', () => {
      it('should call birdsService.update correct', async () => {
        expect(service.update).toBeCalledTimes(1)
        expect(service.update).toBeCalledWith(createBird())
      })
      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  describe('remove', () => {
    let res: any
    beforeEach(async () => {
      res = await resolver.removeBird(createBird().id)
    })

    describe('when removeBird is called', () => {
      it('should call birdsService.remove', async () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(
          new ObjectId(createBird().id.toString()),
        )
      })

      it('should return the correct message', async () => {
        const expectResult: ClientMessage = {
          type: MessageTypes.success,
          message: 'Bird deleted',
          statusCode: 200,
        }
        expect(res).toEqual(expectResult)
      })

      it('should return the correct error message', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue({ affected: 5, raw: '' }) //klaarzetten om te kijken als er removed word
        res = await resolver.removeBird(createBird().id) //efectief een bird removen zodat de spy kan kijken hiernaar
        const expectResult: ClientMessage = {
          type: MessageTypes.error,
          message: 'Delete action went very wrong.',
          statusCode: 400,
        }

        expect(res).toEqual(expectResult)
      })
    })
  })
})
