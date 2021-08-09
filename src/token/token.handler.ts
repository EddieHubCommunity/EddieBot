import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { TokenService } from './token.service';

@Injectable()
export class TokenHandler {
  constructor(private readonly tokenService: TokenService) {}

  @OnCommand({ name: 'token' })
  async createToken(message: Message) {
    let response: string = null;
    const args = message.content.trim().split(/ +/g);

    if (
      !message.member.roles.cache.some(
        (role) => role.name.toLowerCase() === 'moderators',
      )
    ) {
      return await message.reply('You are not authorized to do that');
    }

    switch (args[1]) {
      case 'create':
        response = await this.tokenService.createToken(message);
        break;

      default:
        return await message.reply('Please specify valid arguments');
    }

    return await message.author.send(response);
  }
}
