import { Injectable } from '@nestjs/common';
import { Context, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { VersionService } from './version.service';

@Injectable()
export class VersionHandler {
  constructor(private versionService: VersionService) {}

  @OnCommand({ name: 'version' })
  async bot(@Context() [context]: [Message]): Promise<void> {
    await context.reply(
      `Currently running version "${
        process.env.npm_package_version || '0.0.0'
      }"`,
    );
  }

  @OnCommand({ name: 'api' })
  async api(@Context() [context]: [Message]): Promise<void> {
    const version = await this.versionService.getApi().toPromise();
    await context.reply(version);
  }
}
