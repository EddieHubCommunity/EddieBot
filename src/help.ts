import { Message, MessageEmbed } from "discord.js";

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
			
		default:
			embed
				.setTitle('ERROR: ooops...command not found')
				.setDescription('Try using the !help command.')
        		break;
    }

    message.channel.send(embed);
};
