import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_DOCUMENT } from './config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 4000;
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('docs', app, API_DOCUMENT);

  await app.listen(port, () => console.log(`Server started on port = ${port}`));
}
bootstrap();
