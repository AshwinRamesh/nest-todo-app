import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO - create a new version of this to run workers
// TODO - need to understand how to do threading etc. 
// TODO - how do we deploy this?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
