import { client } from './client';
import { commands } from './commands';
import { chatty } from './chatty';
import { guildMemberAdd } from './guildMemberAdd';
import { messageReactionAdd } from './messageReactionAdd';
import { notifyGeneralChannel } from './notifyGeneralChannel';

client.once('ready', () => {
    console.info('Ready LOCAL!');

    if (client.user) {
        client.user.setPresence({
            activity: {
                name: `${config.COMMAND_PREFIX}help for help`,
                type: 'WATCHING',
            },
            status: 'online'
        });
    }
});

// bot actions
client.on('channelCreate', notifyGeneralChannel);
client.on('guildMemberAdd', (member) => guildMemberAdd(member));
client.on('message', message => commands(message));
client.on('message', message => chatty(message));
client.on('messageReactionAdd', async (reaction) => messageReactionAdd(reaction))

// bot authenticates with discord
client.login(process.env.DISCORD_TOKEN);
