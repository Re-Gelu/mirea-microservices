import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

// Tickets microservice

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swagger_config = new DocumentBuilder()
    .setTitle('Movie Sessions API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('/swagger', app, document);

  app.connectMicroservice({
    name: 'TEST_SERVICE_CONSUMER',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbit-mq:5672'],
      queue: 'test_queue',
      noAck: false,
      queueOptions: {
        durable: true,
      },
      persistent: true,
    },
  });
  await app.startAllMicroservices();

  await app.listen(8001);
}
bootstrap();
