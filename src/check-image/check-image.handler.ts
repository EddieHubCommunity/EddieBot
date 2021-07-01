import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import { Message } from 'discord.js';

@Injectable()
export class CheckImageHandler {
  @On({ event: 'message' })
  checkImage(message: Message) {
    if (message.author.bot) {
      return;
    }
    if (message.author.avatar)
      message.author.send('Please consider adding a profile-picture');
  }
}
