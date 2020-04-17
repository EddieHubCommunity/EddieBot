import { Client } from 'discord.js';
import { commands } from './help';
import { guildMemberAdd } from './guildMemberAdd';
import { messageReactionAdd } from './messageReactionAdd';

const client: Client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once('ready', () => console.log('Ready!'));

client.on('guildMemberAdd', (member) => guildMemberAdd(member));
client.on('message', message => commands(message));
client.on('messageReactionAdd', async (reaction) => messageReactionAdd(reaction))

client.login(process.env.DISCORD_TOKEN);
