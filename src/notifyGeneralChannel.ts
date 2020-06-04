import { DMChannel, GuildChannel, TextChannel } from 'discord.js';

export const notifyGeneralChannel = (channel: DMChannel | GuildChannel) => {
    const channelName = 'general';
    const generalChannel = channel.client.channels.cache.find(currentChannel =>
        currentChannel.id === process.env.GENERAL_CHANNEL_ID ||
        (currentChannel instanceof TextChannel && currentChannel.name === channelName)
    );
    if (!generalChannel)
        return console.error(`${channelName} channel not found. Make sure to setup GENERAL_CHANNEL_ID env variable.`);

    if (generalChannel instanceof TextChannel) {
        const message = `\:tada: A new channel was created! Check out the channel ${channel.toString()}`;
        generalChannel.send(message);
    }
}