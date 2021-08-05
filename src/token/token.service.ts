import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { TokenCacheService } from './token-cache.service';

@Injectable()
export class TokenService {
  constructor(private readonly tokenCacheService: TokenCacheService) {}

  public async createToken(message: Message) {
    const serverId = message.guild.id;
    try {
      const token = await this.tokenCacheService.getNewToken(serverId, [
        'Data.Read',
      ]);
      const returnString = `**New Token created**\n\nA new Accesstoken to access the Eddiehub-Api was created\n\nClientID 🆔:\n\`${token.clientId}\`\n\nAccessToken 🔑:\n\`${token.accessToken}\`\n\nScopes 🚀:\n\`${token.scopes}\``;
      return returnString;
    } catch (error) {
      const returnString = `**Token creation failed**\n\nThere was an error creating a new token`;
      return returnString;
    }
  }
}
