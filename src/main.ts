import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('SERVICE');

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port, () => {
    logger.log(`listening on http://localhost:${port}`);
  });
}

bootstrap();
