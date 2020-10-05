import { MessageEmbed } from 'discord.js';

export const command = async (arg: string, embed: MessageEmbed) => {
  return embed
    .setTitle('Code of Conduct (CoC) - Contributor Covenant Code of Conduct')
    .setDescription(
      `We as members, contributors, and leaders pledge to make participation in our
  community a harassment-free experience for everyone, regardless of age, body
  size, visible or invisible disability, ethnicity, sex characteristics, gender
  identity and expression, level of experience, education, socio-economic status,
  nationality, personal appearance, race, religion, or sexual identity
  and orientation.
  We pledge to act and interact in ways that contribute to an open, welcoming,
  diverse, inclusive, and healthy community.
  Our Standards`
    )
    .addField('TLDR', 'Be nice :)', true)
    .addField(
      'Full details available on GitHub repo',
      'https://github.com/EddieJaoudeCommunity/EddieBot/blob/master/CODE_OF_CONDUCT.md',
      true
    );
};

export const description = 'Code Of Conduct';

export const triggers = ['coc', 'codeofconduct'];

export const usage = triggers[0];
