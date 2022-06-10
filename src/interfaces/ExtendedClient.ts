import { Client } from 'discord.js';

export interface ExtendedClient extends Client {
  cache: { [key: string]: { allow: string[]; deny: string[] } };
}
