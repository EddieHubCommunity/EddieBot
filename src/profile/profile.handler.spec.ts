import { Test, TestingModule } from '@nestjs/testing';
import { ProfileHandler } from './profile.handler';

describe('ProfileService', () => {
  let service: ProfileHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileHandler],
    }).compile();

    service = module.get<ProfileHandler>(ProfileHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
