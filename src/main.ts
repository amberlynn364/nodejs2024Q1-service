import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_DOCUMENT } from './config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from './db/exception.filter';
import { LoggingService } from './logging/logging.service';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggingService = new LoggingService();
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useLogger(loggingService);
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  process.on('uncaughtException', (error, origin) => {
    loggingService.error(`Uncaught exception: ${error}, Origin ${origin}`);
  });
  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      `Unhandled rejection at: ${promise}, Reason ${reason}`,
    );
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 4000;

  SwaggerModule.setup('docs', app, API_DOCUMENT);

  await app.listen(port, () =>
    loggingService.log(`Server started on port = ${port}`),
  );
}
bootstrap();
