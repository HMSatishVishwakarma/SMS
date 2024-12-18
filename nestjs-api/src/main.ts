import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const portNumber = config.get('port');

  app.useGlobalFilters(new MongoExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: false, // if true, request can omit (or include as null or undefined) properties defined in the DTO
      enableDebugMessages: config.get('enableDebugMessage'),
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  if (config.get('NODE_ENV') === 'local') mongoose.set('debug', true);

  app.setGlobalPrefix('api');
  await app.listen(portNumber);
  console.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
