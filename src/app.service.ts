import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';

@Injectable()
export class AppService {
  @On({ event: 'ready' })
  OnReady() {
    console.log('Eddiebot started successfully');
  }
}
