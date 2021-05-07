import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import { Message } from 'discord.js';
import { AlexService } from './alex.service';

@Injectable()
export class BotService {
  constructor(private readonly alexService: AlexService) {}
  @On({ event: 'ready' })
  OnReady() {
    console.log('ready');
  }
  @On({ event: 'message' })
  onMessage(message: Message) {
    return this.alexService.checkAlex(message);
  }
}
