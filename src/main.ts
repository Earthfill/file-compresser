import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    compression({
      filter: () => {
        return true;
      },
      threshold: 0,
    }),
  );
  app.useGlobalFilters(new ExceptionsLoggerFilter());
  await app.listen(3000);
}
bootstrap();
