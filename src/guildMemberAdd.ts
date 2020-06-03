import { GuildMember, PartialGuildMember } from "discord.js";

export const guildMemberAdd = async (member: GuildMember | PartialGuildMember) => {
    if (member.partial) {
		try {
			await member.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
    }

	const channelName = 'introductions';
	const channel = member.guild.channels.cache.find((ch) => ch.name === channelName && ch.type === 'text');

	if (!channel) {
		console.error(`${channelName} not found`);
		return;
	}
console.log(channel)
	// channel.send(`Welcome to the server, ${member}`);
}
