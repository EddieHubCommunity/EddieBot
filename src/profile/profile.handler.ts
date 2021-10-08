import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileHandler {
  constructor(private readonly profileService: ProfileService) {}

  @OnCommand({ name: 'profile' })
  async handleProfile(message: Message) {
    const args = message.content.trim().split(/ +/g);

    let response: string;

    switch (args[1]) {
      // !profile create
      case 'create':
        response = await this.profileService.createUser(message);
        break;

      // !profile socials twitter https://twitter.com/cahllagerfeld
      case 'socials':
        //TODO args [3] with spaces causes issues with trim function
        response = await this.profileService.updateSocials(
          message,
          args[2],
          args[3],
        );
        break;

      case 'bio':
        response = await this.profileService.updateBio(message, args[2]);
        break;

      default:
        return await message.reply('Please specify valid arguments');
    }

    await message.reply(response);
  }
}
