import { Module } from '@nestjs/common';
import { ProfileService } from './profile.handler';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService]
})
export class ProfileModule {}
