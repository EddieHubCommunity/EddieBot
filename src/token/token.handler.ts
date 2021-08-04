import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { TokenService } from './token.service';

@Injectable()
export class TokenHandler {
  constructor(private readonly tokenService: TokenService) {}

  @OnCommand({ name: 'create-token' })
  async createToken(message: Message) {
    if (message.member.roles.cache.some((role) => role.name === 'Moderators')) {
      const embed = await this.tokenService.createToken(message);
      const sentMessage = await message.channel.send(embed);
      sentMessage.delete({ timeout: 180000 });
    } else {
      await message.reply('You are not authorized to do that');
    }
  }
}
