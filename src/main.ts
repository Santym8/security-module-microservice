import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { ExceptionHandler } from './config/exception/ExceptionHandler';
import { ValidationHandler } from './config/exception/ValidationHandler';
import { TrimPipe } from './config/pipe/TrimPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(morgan('dev'))
  app.useGlobalFilters(new ExceptionHandler())
  app.useGlobalPipes(new ValidationHandler())
  app.useGlobalPipes(new TrimPipe())




  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
