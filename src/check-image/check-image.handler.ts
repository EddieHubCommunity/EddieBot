import { On } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { CheckImageService } from './check-image.service';

@Injectable()
export class CheckImageHandler {
  constructor(private readonly checkImageService: CheckImageService) { }
  @On('messageCreate')
  checkImage(message: Message) {
    if (message.author.bot) {
      return;
    }
    this.checkImageService.checkImage(message);
    return;
  }
}
