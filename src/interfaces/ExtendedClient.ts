import { Client, WebhookClient } from 'discord.js';
import { Document } from 'mongoose';
import { ServerConfig } from '../database/models/ServerConfig';

export interface ExtendedClient extends Client {
  cache: {
    [key: string]: Omit<ServerConfig, keyof Document | 'serverId'>;
  };
  config: {
    token: string;
    dbUri: string;
    debugHook: WebhookClient;
  };
}
