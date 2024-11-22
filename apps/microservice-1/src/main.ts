import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

// Movies microservice

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swagger_config = new DocumentBuilder()
    .setTitle('Movies API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(8000);
}
bootstrap();
