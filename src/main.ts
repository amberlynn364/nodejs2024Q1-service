import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_DOCUMENT } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from './db/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 4000;

  SwaggerModule.setup('docs', app, API_DOCUMENT);

  await app.listen(port, () => Logger.log(`Server started on port = ${port}`));
}
bootstrap();
