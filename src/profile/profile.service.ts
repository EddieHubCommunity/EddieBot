import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { TokenCacheService } from '../token/token-cache.service';
import { Socials } from './interfaces/socials.interface';

@Injectable()
export class ProfileService {
  constructor(
    private readonly http: HttpService,
    private readonly tokenCache: TokenCacheService,
    private readonly config: ConfigService,
  ) {}

  public async createUser(message: Message): Promise<string> {
    const createUserDTO = {
      author: {
        platform: 'discord',
        uid: message.author.id,
      },
      bio: '',
      socials: {},
    };
    const token = await this.tokenCache.returnToken(message.guild.id);

    try {
      const response = await this.http
        .post(`${this.config.get('API_URL')}/discord`, createUserDTO, {
          headers: { authorization: `Bearer ${token}` },
        })
        .toPromise();
      console.log(response.data);
      return 'Profile created successfully';
    } catch (error) {
      console.log(error);
      return 'Profile created not successfully';
    }
  }

  public async updateSocials(message: Message, platform: string, link: string) {
    let returnMessage: string = null;
    let socialsObject: Socials = {};

    switch (platform) {
      case 'twitter':
        socialsObject = { twitter: link };
        break;

      case 'linkedin':
        socialsObject = { linkedin: link };
        break;

      case 'github':
        socialsObject = { github: link };
        break;

      case 'discord':
        socialsObject = { discord: message.author.username };
        break;
      default:
        returnMessage = 'Please provide valid social platform';
        break;
    }

    const updateUser = {
      author: {
        platform: 'discord',
        uid: message.author.id,
      },
      bio: '',
      socials: socialsObject,
    };

    returnMessage = await this.performUpdate(updateUser, message);

    return returnMessage;
  }

  public async updateBio(message: Message, bio: string) {
    const updateUser = {
      author: {
        platform: 'discord',
        uid: message.author.id,
      },
      bio: bio,
      socials: {},
    };
    return await this.performUpdate(updateUser, message);
  }

  private async performUpdate(body: any, message: Message): Promise<string> {
    const token = await this.tokenCache.returnToken(message.guild.id);
    try {
      await this.http
        .put(
          `${this.config.get('API_URL')}/discord/${message.author.id}`,
          body,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'User-Uid': message.author.id,
            },
          },
        )
        .toPromise();
      return 'Updated successfully';
    } catch (error) {
      return 'Update failed';
    }
  }
}
