import { HttpModule, Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { ProfileHandler } from './profile.handler';
import { ProfileService } from './profile.service';

@Module({
  imports: [HttpModule, TokenModule],
  providers: [ProfileService, ProfileHandler]
})
export class ProfileModule { }
