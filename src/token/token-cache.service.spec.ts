import { Test, TestingModule } from '@nestjs/testing';
import { TokenCacheService } from './token-cache.service';

describe('TokenCacheService', () => {
  let service: TokenCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenCacheService],
    }).compile();

    service = module.get<TokenCacheService>(TokenCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
