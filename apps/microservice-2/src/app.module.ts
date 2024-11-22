import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { PrismaCrudModule } from 'nestjs-prisma-crud';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_SERVICE_CONSUMER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbit-mq:5672'],
          queue: 'test_queue',
          queueOptions: {
            durable: true,
          },
          persistent: true,
        },
      },
    ]),

    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),

    PrismaCrudModule.register({
      prismaService: PrismaService,
      accessControl: {
        authDataKey: 'user',
        getRolesFromAuthDataFn: (authenticatedUser) => authenticatedUser?.roles,
        strict: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
