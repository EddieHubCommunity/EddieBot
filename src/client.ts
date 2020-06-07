import { Client } from 'discord.js';

export const client: Client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
