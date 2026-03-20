import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

  if (process.env.NODE_ENV !== 'production') {
    const port = 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Codespaces/Local server running on port ${port}`);
  }

    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

if (process.env.NODE_ENV !== 'production') {
  const startLocal = async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true, credentials: true });
    const port = 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: http://0.0.0.0:${port}`);
  };
  startLocal();
}

export default async (req: any, res: any) => {
  const instance = await bootstrap();
  instance(req, res);
};