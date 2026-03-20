import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  return app.init();
};

if (process.env.NODE_ENV !== 'production') {
  const startLocal = async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true, credentials: true });
    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: http://0.0.0.0:3000`);
  };
  startLocal();
}

let isInitialized = false;

export default async (req: any, res: any) => {
  if (!isInitialized) {
    await createNestServer(server);
    isInitialized = true;
  }
  server(req, res);
};