import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscordConfigService } from './discord-config.service';

describe('DiscordConfigService', () => {
  let service: DiscordConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [DiscordConfigService],
    }).compile();

    service = module.get<DiscordConfigService>(DiscordConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
