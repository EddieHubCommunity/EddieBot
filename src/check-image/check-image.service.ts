import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class CheckImageService {
  private alertAt = 10;
  private countsDictionary: { [key: string]: number } = {};

  public checkImage(message: Message): void {
    const authorId = message.author.id;
    if (!message.author.avatar) {
      if (this.countsDictionary[authorId]) {
        this.countsDictionary[authorId]++;
      } else {
        this.countsDictionary[authorId] = 1;
      }

      if (this.countsDictionary[authorId] > this.alertAt) {
        message.author.send(
          'Please consider adding a profile picture, it is more friendly. It does not have to be you, but something unique, like a cartoon version of yourself or a pet.',
        );
        this.countsDictionary[authorId] = 0;
      }
    }
  }
}
