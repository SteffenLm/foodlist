// needed to extend the dependency graph, which generates the package.json file
// organize-imports-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Dependencies from './dependencies';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APIPORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
