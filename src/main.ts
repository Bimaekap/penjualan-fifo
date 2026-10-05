import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import listEndpoints from 'express-list-endpoints';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const expressInstance = app.getHttpAdapter().getInstance();
  console.table(listEndpoints(expressInstance));
}
await bootstrap();
