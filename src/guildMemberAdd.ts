import { GuildMember, PartialGuildMember } from "discord.js";

export const guildMemberAdd = (member: GuildMember | PartialGuildMember) => {
	const channelName = 'introductions';
	const channel = member.guild.channels.cache.find((ch) => ch.name === channelName && ch.type === 'text');

	if (!channel) {
		console.error(`${channelName} not found`);
		return;
	}
console.log(channel)
	// channel.send(`Welcome to the server, ${member}`);
  }
