import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VersionHandler } from './version.handler';
import { VersionService } from './version.service';

@Module({
  imports: [HttpModule],
  providers: [VersionHandler, VersionService],
  exports: [],
})
export class VersionModule {}
