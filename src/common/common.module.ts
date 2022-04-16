import { Module } from '@nestjs/common';
import { IsPostField } from './constraint';

@Module({
  providers: [IsPostField],
  exports: [IsPostField],
})
export class CommonModule {}
