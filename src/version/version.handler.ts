import { Injectable } from '@nestjs/common';
import { Context, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';

@Injectable()
export class VersionHandler {
  @OnCommand({ name: 'version' })
  async version(@Context() [context]: [Message]): Promise<void> {
    await context.reply(`Currently running version "${process.env.VERSION}"`);
  }
}
