import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { ExceptionHandler } from './config/exception/ExceptionHandler';
import { ValidationHandler } from './config/exception/ValidationHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'))
  app.useGlobalFilters(new ExceptionHandler())
  app.useGlobalPipes(new ValidationHandler())




  await app.listen(3000);
}
bootstrap();
