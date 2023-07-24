import { Logger as Writer, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('http.port');
  const root = 'v1';

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix(root);

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder().setTitle('Auth API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${root}/api`, app, document);

  const logger = new Writer('bootstrap');
  await app.listen(port, () => logger.log(`Http application started at port: ${port}.`));
}

bootstrap();
