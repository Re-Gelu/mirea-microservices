import { PrismaCrudService } from 'nestjs-prisma-crud';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService extends PrismaCrudService implements OnModuleInit {
  constructor(
    @Inject('TEST_SERVICE_CONSUMER') private readonly client: ClientProxy,
  ) {
    super({
      model: 'movieSession',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }
}
