import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

@Injectable()
export class DatabaseOptions {
  constructor(private readonly configService: ConfigService) {}

  make(): TypeOrmModuleOptions {
    const database = this.configService.get<DatabaseConfig>('database');
    const { host, port, name, username, password } = database;

    return {
      type: 'mysql',
      database: name,
      host,
      port,
      username,
      password,
      entities: ['./dist/*/*.entity{.ts,.js}', './dist/*/entities/*.entity{.ts,.js}'],
      migrations: ['./dist/migration/*-*{.ts,.js}'],
      extra: {
        connectionLimit: 10,
      },
      timezone: 'Z',
    };
  }
}
