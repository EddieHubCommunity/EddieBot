import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message, MessageEmbed } from 'discord.js';
import config from '../config';
import { ValidationResponse } from './interfaces/token.interface';
import { TokenCacheService } from './token-cache.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenCacheService: TokenCacheService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async createToken(message: Message) {
    // const serverId = message.guild.id;
    const serverId = 'eddiehub';
    let returnString: string;
    try {
      const token = await this.tokenCacheService.getNewToken(serverId, [
        'Data.Read',
      ]);
      returnString = `**New Token created**\n\nA new Accesstoken to access the Eddiehub-Api was created\n\nClientID 🆔:\n\`${token.clientId}\`\n\nAccessToken 🔑:\n\`${token.accessToken}\`\n\nScopes 🚀:\n\`${token.scopes}\``;
      return returnString;
    } catch (error) {
      returnString = `**Token creation failed**\n\nThere was an error creating a new token`;
      return returnString;
    }
  }
  public async validateToken(message: Message, token: String) {
    let embed: MessageEmbed;
    let url = `${this.configService.get('API_URL')}/auth/validate`;
    try {
      const response = await this.httpService
        .post(
          url,
          { token },
          { headers: { 'Client-Token': this.configService.get('API_TOKEN') } },
        )
        .toPromise();
      const body = response.data as ValidationResponse;
      if (body.valid === false) {
        return config
          .defaultEmbed(config.colors.alerts)
          .setTitle('Validation failed')
          .setDescription('The Validation of your token was not successfull')
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL(),
          );
      }
      return config
        .defaultEmbed(config.colors.message)
        .setTitle('Validation successfull')
        .setDescription('The Validation of your token was successfull')
        .setAuthor(message.author.username, message.author.displayAvatarURL());
    } catch (error) {
      console.log(error);
      return config
        .defaultEmbed(config.colors.alerts)
        .setTitle('Validation failed')
        .setDescription(
          `There was an Error with validating your token: \n \`${error.message}\``,
        )
        .setAuthor(message.author.username, message.author.displayAvatarURL());
    }
  }
}
