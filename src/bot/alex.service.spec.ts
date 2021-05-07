import { Test, TestingModule } from '@nestjs/testing';
import { AlexService } from './alex.service';

describe('AlexService', () => {
  let service: AlexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlexService],
    }).compile();

    service = module.get<AlexService>(AlexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
