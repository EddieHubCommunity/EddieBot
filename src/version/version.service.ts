import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VersionService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getApi() {
    return this.httpService.get(this.configService.get('API_URL'));
  }
}
