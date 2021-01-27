import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupDocumentation } from './config/documentation.config';

const documentationRoute = 'documentation'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
    }),
  )
  app.useGlobalPipes(new ValidationPipe({ transform: true,})); 
 
  void setupDocumentation(app, 'documentation')
  const appName = process.env.APP_NAME ?? 'Event Tracking'
  const port = process.env.APP_PORT ?? 3333
  await app.listen(port);
  console.log(`🚀 ${String(appName)} \n (API) is running on: http://localhost:${String(port)} \n (DOCUMENTATION) is running on: http://localhost:${String(port)}/${String(documentationRoute)}`);
}
bootstrap();
