import { Client, WebhookClient } from 'discord.js';
import { Document } from 'mongoose';
import type { ServerConfig } from '../database/models/ServerConfig.js';
import type { Command } from './Command.js';

export interface ExtendedClient extends Client {
  commands: Command[];
  cache: {
    [key: string]: Omit<ServerConfig, keyof Document | 'serverId'>;
  };
  config: {
    token: string;
    dbUri: string;
    debugHook: WebhookClient | undefined;
    homeGuild: string;
  };
}
