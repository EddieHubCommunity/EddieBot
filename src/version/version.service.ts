import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  constructor(private httpService: HttpService) {}

  getApi() {
    return this.httpService.get('http://api.eddiehub.org');
  }
}
