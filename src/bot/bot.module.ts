import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { AlexService } from './alex.service';
import { BotService } from './bot.service';
import { DiscordConfigService } from './discord-config.service';

@Module({
  imports: [DiscordModule.forRootAsync({ useClass: DiscordConfigService })],
  providers: [DiscordConfigService, BotService, AlexService],
})
export class BotModule {}
