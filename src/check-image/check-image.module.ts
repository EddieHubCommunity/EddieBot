import { Module } from '@nestjs/common';
import { CheckImageHandler } from './check-image.handler';

@Module({
  providers: [CheckImageHandler],
  exports: [CheckImageHandler],
})
export class CheckImageModule {}
