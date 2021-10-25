import { CacheModule, Module } from '@nestjs/common';
import { TokenHandler } from './token.handler';
import { TokenService } from './token.service';
import { TokenCacheService } from './token-cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [TokenHandler, TokenService, TokenCacheService],
  exports: [TokenCacheService],
})
export class TokenModule { }
