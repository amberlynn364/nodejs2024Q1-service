import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_DOCUMENT, PORT } from './config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('docs', app, API_DOCUMENT);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
