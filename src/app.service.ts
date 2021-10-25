import { On } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @On('ready')
  OnReady() {
    console.log('Eddiebot started successfully');
  }
}
