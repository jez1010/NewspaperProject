import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  if (!process.env.VERCEL) {
    await app.listen(3000);
    console.log('Local server running on http://localhost:3000');
  }
  
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default bootstrap();