import { HttpService, Injectable } from '@nestjs/common';
import { TokenCacheService } from '../token/token-cache.service';

@Injectable()
export class ProfileService {
    constructor(private readonly http: HttpService, private readonly tokenCache: TokenCacheService) { }
    public checkExistingUser(userid: string) { 

    }

    public createUser(){}

    public updateUser(){}
}
