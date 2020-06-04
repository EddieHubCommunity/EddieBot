import { Client } from 'discord.js';
import { commands } from './commands';
import { guildMemberAdd } from './guildMemberAdd';
import { messageReactionAdd } from './messageReactionAdd';
import { chatty } from './chatty';
import { notifyGeneralChannel } from './notifyGeneralChannel';
import { DiscordStatsService } from './stats/discordStatsService';

// initial client with params
const client: Client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const discordStatsService = new DiscordStatsService(client)

// client is ready
client.once('ready', () => console.log('Ready LOCAL!'));

// bot actions
client.on('channelCreate', notifyGeneralChannel);
client.on('guildMemberAdd', (member) => guildMemberAdd(member));
client.on('message', message => commands(message, discordStatsService));
client.on('message', message => chatty(message));
client.on('messageReactionAdd', async (reaction) => messageReactionAdd(reaction))

// bot authenticates with discord
client.login(process.env.DISCORD_TOKEN);
