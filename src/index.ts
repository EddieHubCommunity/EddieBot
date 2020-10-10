import { client } from './client';
import config from './config';
import { commands } from './commands';
import { chatty } from './chatty';
import { guildMemberAdd } from './guildMemberAdd';
import { log } from './logger';
import { messageReactionAdd } from './messageReactionAdd';
import { notifyGeneralChannel } from './notifyGeneralChannel';
import { timezone } from './timezone';
import { words } from './words';
import { eventStream } from './eventStream';
import { scheduleOpenSourceReminder } from './opensourceReminder.job';

client.once('ready', () => {
  log.info('Online!', 'Lets get started...');
  scheduleOpenSourceReminder();
  if (client.user) {
    client.user.setPresence({
      activity: {
        name: `${config.COMMAND_PREFIX}help for help`,
        type: 'WATCHING',
      },
      status: 'online',
    });
  }
});

// bot actions
client.on('channelCreate', notifyGeneralChannel);
client.on('guildMemberAdd', (member) => guildMemberAdd(member));
client.on('message', (message) => commands(message));
client.on('message', (message) => chatty(message));
client.on('message', (message) => timezone(message));
client.on('message', (message) => words(message));
client.on('messageReactionAdd', async (reaction) =>
  messageReactionAdd(reaction)
);

// all events
client.on('message', (message) =>
  eventStream({ type: 'message', author: message.author })
);
client.on('messageReactionAdd', (reaction, user) =>
  eventStream({ type: 'reaction', author: user })
);

// bot authenticates with discord
client.login(process.env.DISCORD_TOKEN);
