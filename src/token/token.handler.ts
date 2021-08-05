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
      const response: string = await this.tokenService.createToken(message);
      await message.author.send(response);
    } else {
      await message.reply('You are not authorized to do that');
    }
  }
}
