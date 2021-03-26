import { MessageEmbed } from 'discord.js';

import config from '../../config';
import { readMarkdown } from './opensource.service';

/**
 * Set the given embed message with a curated list of tips and resources that help members of the community to
 * contribute to open-source software (OSS).
 */
export const createTip = async (embed: MessageEmbed) => {
  const tipsPromise = Promise.all(config.TIPS.tips.map(readMarkdown));
  const resourcesPromise = Promise.all(config.TIPS.resources.map(readMarkdown));

  const tips = await tipsPromise;
  const resources = await resourcesPromise;

  tips.forEach((tip) => embed.addField('Tips :bulb:', tip));
  resources.forEach((resource) =>
    embed.addField('Links and Resources :link:', resource)
  );

  embed
    .setTitle('Open source Tips and Resources')
    .addField(
      'Help us with this list :heart:',
      'If you want to contribute to this list, feel free to [open an issue](https://github.com/EddieJaoudeCommunity/EddieBot/issues). Label it with "command: opensource" so we can easily find your tips and links :slight_smile:'
    );

  return embed;
};
