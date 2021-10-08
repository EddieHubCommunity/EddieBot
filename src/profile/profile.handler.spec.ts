import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '../token/token.module';
import { ProfileHandler } from './profile.handler';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, TokenModule],
      providers: [ProfileHandler, ProfileService],
    }).compile();

    service = module.get<ProfileHandler>(ProfileHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
