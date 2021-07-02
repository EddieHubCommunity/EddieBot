import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class CheckImageService {
  private countsDictionary: { [key: string]: number } = {};

  public checkImage(message: Message): void {
    const authorId = message.author.id;
    console.log(authorId);
    if (authorId) {
      if (this.countsDictionary[authorId]) {
        this.countsDictionary[authorId]++;
      } else {
        this.countsDictionary[authorId] = 1;
      }

      if (this.countsDictionary[authorId] > 3) {
        message.author.send('Please consider adding a profile picture');
        this.countsDictionary[authorId] = 0;
      }
    }
    console.log(this.countsDictionary);
  }
}
