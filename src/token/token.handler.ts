import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { checkDM, checkMod } from '../util/checks';
import { TokenService } from './token.service';

@Injectable()
export class TokenHandler {
  constructor(private readonly tokenService: TokenService) {}

  @OnCommand({ name: 'token' })
  async createToken(message: Message) {
    let response: string = null;
    const args = message.content.trim().split(/ +/g);

    switch (args[1]) {
      case 'create':
        if (checkMod(message))
          return await message.reply('You are not authorized to do that');
        response = await this.tokenService.createToken(message);
        return await message.author.send(response);

      case 'validate':
        if (!args[2])
          return await message.reply(
            'Please provide a token as second argument',
          );
        if (!checkDM(message))
          return await message.reply('Please use this command in a DM');
        const token = args[2];
        const embed = await this.tokenService.validateToken(message, token);
        message.channel.send(embed);
        break;

      default:
        return await message.reply('Please specify valid arguments');
    }
  }
}
