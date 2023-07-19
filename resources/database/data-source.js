/* eslint-disable @typescript-eslint/no-var-requires */
const { DataSource } = require('typeorm');

const database = process.env.DATABASE_NAME || 'auth-api';
const host = process.env.DATABASE_HOST || '127.0.0.1';
const port = parseInt(process.env.DATABASE_PORT, 10) || 3306;
const username = process.env.DATABASE_USERNAME || 'root';
const password = process.env.DATABASE_PASSWORD || 'root';

const dataSource = new DataSource({
  type: 'mysql',
  database,
  host,
  port,
  username,
  password,
  entities: ['./dist/*/*.entity{.ts,.js}'],
  migrations: ['./dist/migration/*-*{.ts,.js}'],
  synchronize: false,
  timezone: 'Z',
});

module.exports = [dataSource];
