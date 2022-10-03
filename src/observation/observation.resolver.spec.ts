import { Test, TestingModule } from '@nestjs/testing';
import { ObservationResolver } from './observation.resolver';
import { ObservationService } from './observation.service';

describe('ObservationResolver', () => {
  let resolver: ObservationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservationResolver, ObservationService],
    }).compile();

    resolver = module.get<ObservationResolver>(ObservationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
