import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import { Message } from 'discord.js';
import { CheckImageService } from './check-image.service';

@Injectable()
export class CheckImageHandler {
  constructor(private readonly checkImageService: CheckImageService) {}
  @On({ event: 'message' })
  checkImage(message: Message) {
    if (message.author.bot) {
      return;
    }
    this.checkImageService.checkImage(message);
    return;
  }
}
