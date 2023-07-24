import * as process from 'process';

export default () => ({
  http: {
    port: process.env.PORT || 3000,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'trace',
    pretty: String(process.env.NODE_ENV).toLowerCase() !== 'production',
  },
  database: {
    name: process.env.DATABASE_NAME || 'auth-api',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
  },
  auth: {
    secret: process.env.JWT_SECRET,
    accessTokenExpireIn: '60s',
    refreshTokenExpireIn: '7d',
  },
});
