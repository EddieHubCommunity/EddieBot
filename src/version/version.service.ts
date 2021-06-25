import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VersionService {
  private logger = new Logger(VersionService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getApi() {
    try {
      return this.httpService
        .get(this.configService.get('API_URL', 'http://api.eddiehub.org'))
        .pipe(map((response) => response.data));
    } catch (e) {
      this.logger.error(e);
      return of('No versions available');
    }
  }
}
