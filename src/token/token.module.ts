import { HttpModule, Module } from '@nestjs/common';
import { TokenHandler } from './token.handler';
import { TokenService } from './token.service';

@Module({
  imports: [HttpModule],
  providers: [TokenHandler, TokenService],
})
export class TokenModule {}
