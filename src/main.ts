import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupDocumentation } from './config/documentation.config';
import { appName, documentationRoute, port } from './config/main.config';
import userSeed from './modules/user/seed/user.seed';

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
  await userSeed()
  void setupDocumentation(app, 'documentation')
  app.set('trust proxy', true)
  await app.listen(port)

  console.log(`🚀 ${String(appName)} \n (API) is running on: http://localhost:${String(port)} \n (DOCUMENTATION) is running on: http://localhost:${String(port)}/${String(documentationRoute)}`);
}
bootstrap();
