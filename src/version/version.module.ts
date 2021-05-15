import { Module } from '@nestjs/common';
import { VersionHandler } from './version.handler';

@Module({
  providers: [VersionHandler],
  exports: [],
})
export class VersionModule {}
