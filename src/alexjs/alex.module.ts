import { Module } from '@nestjs/common';
import { AlexHandler } from './alex.handler';
import { AlexService } from './alex.service';

@Module({
  providers: [AlexService, AlexHandler],
  exports: [AlexHandler],
})
export class AlexModule {}
