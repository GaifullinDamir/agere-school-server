import { Module } from '@nestjs/common';
import { ParsersService } from './parsers.service';

@Module({
  controllers: [],
  providers: [ParsersService],
  imports: [],
  exports: [ParsersService]
})
export class ParsersModule {}
