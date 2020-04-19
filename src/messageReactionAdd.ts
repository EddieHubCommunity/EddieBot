import { MessageReaction } from "discord.js";

export const messageReactionAdd = async (reaction: MessageReaction) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}

    // if message owner gets 5+ reactions add "high value" role
    if (reaction.count! >= 5) {
        const role = reaction.message.guild!.roles.cache.find(role => role.name === 'high value');
        const member = reaction.message.member;
        await member!.roles.add(role!);
    }
};
