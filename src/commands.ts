import { Message, MessageEmbed, Client } from "discord.js";

export const commands = (message: Message) => {
	const prefix = '!';
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift()!.toLowerCase();

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTimestamp()
		.setFooter('Our bot is Open Source, you can find it here https://github.com/eddiejaoude/EddieBot');

	switch (command) {
		case 'help':
            		embed
			.setTitle('Help commands')
			.setDescription('Lists the command available')
			.addField('!help', 'Lists available commands', true)
				.addField('!coc', 'Code of Conduct', true)
			break;

		case 'codeofconduct':
		case 'coc':
			embed
				.setTitle('Code of Conduct (CoC) - Contributor Covenant Code of Conduct')
				.setDescription(`We as members, contributors, and leaders pledge to make participation in our
				community a harassment-free experience for everyone, regardless of age, body
				size, visible or invisible disability, ethnicity, sex characteristics, gender
				identity and expression, level of experience, education, socio-economic status,
				nationality, personal appearance, race, religion, or sexual identity
				and orientation.
				We pledge to act and interact in ways that contribute to an open, welcoming,
				diverse, inclusive, and healthy community.
				Our Standards`)
				.addField('TLDR', 'Be nice :)', true)
				.addField('Full details availabe on GitHub repo', 'https://github.com/eddiejaoude/EddieBot/blob/master/CODE_OF_CONDUCT.md', true)
			break;

		case 'stats':
			const memberCount = getServerMemberCount(message.client);
			embed
				.setTitle('Server stats')
				.addField('total users', memberCount)
			break;
	
		default:
			embed
				.setTitle('ERROR: ooops...command not found')
				.setDescription('Try using the !help command.')
        		break;
    }
console.log('HELP');
    message.channel.send(embed);
};

/**
 * @returns the number of members in the server configured by the environment variables or null if there was an error
 */
export function getServerMemberCount(client: Client) {
    const guildKey = process.env.DISCORD_SERVER_ID
    if (!guildKey) {
        console.error(`ERROR: Couldn't get member count! Missing env. variable DISCORD_SERVER_ID. Please configure that value.`)
        return 0
    }

    const guild = client.guilds.cache.get(guildKey)
    if (!guild) {
        console.error(`ERROR: Couldn't get member count! The guild with the configured DISCORD_SERVER_ID env. variable doesn't exist`)
        return 0
    }

    return guild.memberCount
}