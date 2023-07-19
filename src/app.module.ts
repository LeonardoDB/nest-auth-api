import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import configuration from './config/configuration';
import { DatabaseModule } from './config/database/database.module';
import { DatabaseOptions } from './config/database/database.options';
import { LoggerModule } from './lib/logger/logger.module';
import { LoggerOptions } from './lib/logger/logger.options';
import { MeModule } from './me/me.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [DatabaseOptions],
      useFactory: (databaseOptions: DatabaseOptions) => databaseOptions.make(),
    }),
    PinoLoggerModule.forRootAsync({
      imports: [LoggerModule],
      inject: [LoggerOptions],
      useFactory: (loggerOptions: LoggerOptions) => loggerOptions.make(),
    }),
    UserModule,
    AuthModule,
    MeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
