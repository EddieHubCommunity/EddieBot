import { Client } from 'discord.js';

// Official docs: https://discord.com/developers/docs/topics/gateway#privileged-intents
enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

export const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: {
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS',
      PrivilegedIntents.GUILD_MEMBERS,
    ],
  },
});
