import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { TokenResponse } from './interfaces/token.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  public async createToken(message: Message) {
    const serverId = message.guild.id;
    const postURL = `${this.config.get('API_URL')}/auth`;
    const response = await this.http
      .post(
        postURL,
        {
          scopes: ['Data.Read'],
          serverId,
        },
        { headers: { 'Client-Token': this.config.get('API_TOKEN') } },
      )
      .toPromise();

    return response.data as TokenResponse;
  }
}
