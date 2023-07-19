import { Module } from '@nestjs/common';

import { DatabaseOptions } from './database.options';

@Module({
  imports: [],
  exports: [DatabaseOptions],
  controllers: [],
  providers: [DatabaseOptions],
})
export class DatabaseModule {}
