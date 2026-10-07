import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import listEndpoints from 'express-list-endpoints';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )
  await app.listen(process.env.PORT ?? 3000);

  const expressInstance = app.getHttpAdapter().getInstance();
  console.table(listEndpoints(expressInstance));
}


// definisi untuk mengatasi route yang sama
const app = await NestFactory.create(AppModule, {
    routeResolutionStrategy: 'specificity', 
  }
)
await bootstrap();
