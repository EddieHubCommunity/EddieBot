import { Message } from 'discord.js';

export function checkMod(message: Message): boolean {
  if (
    !message.member.roles.cache.some(
      (role) => role.name.toLowerCase() === 'moderators',
    )
  )
    return false;

  return true;
}

export function checkDM(message: Message): boolean {
  if (message.channel.type === 'dm') return true;
  return false;
}
