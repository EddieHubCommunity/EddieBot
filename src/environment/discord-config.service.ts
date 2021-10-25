import { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Intents } from 'discord.js';
@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(private config: ConfigService) { }
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: this.config.get('DISCORD_TOKEN'),
      discordClientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
      }
    };
  }
}
