import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import config from '../config';
import { TokenCacheService } from './token-cache.service';

const { defaultEmbed, colors } = config;

@Injectable()
export class TokenService {
  constructor(private readonly tokenCacheService: TokenCacheService) {}

  public async createToken(message: Message) {
    const serverId = message.guild.id;
    let token = null;
    try {
      token = await this.tokenCacheService.getNewToken(serverId, ['Data.Read']);
      const successEmbed = defaultEmbed(colors.message)
        .setTitle('New Token created')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription('A new Token to access to API was created successfully')
        .addField('AccessToken: ', `\`${token.accessToken}\``)
        .addField('Client-ID: ', `\`${token.clientId}\``);
      return successEmbed;
    } catch (error) {
      const errorEmbed = defaultEmbed(colors.alerts)
        .setTitle('Creation of token failed')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(
          'There was an error creating a new Accesstoken for the API',
        );
      return errorEmbed;
    }
  }
}
