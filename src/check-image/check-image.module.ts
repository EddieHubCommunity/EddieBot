import { Module } from '@nestjs/common';
import { CheckImageHandler } from './check-image.handler';
import { CheckImageService } from './check-image.service';

@Module({
  providers: [CheckImageHandler, CheckImageService],
  exports: [CheckImageHandler],
})
export class CheckImageModule {}
