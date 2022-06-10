import { Client, WebhookClient } from 'discord.js';

export interface ExtendedClient extends Client {
  cache: { [key: string]: { allow: string[]; deny: string[] } };
  config: {
    token: string;
    dbUri: string;
    debugHook: WebhookClient;
  };
}
