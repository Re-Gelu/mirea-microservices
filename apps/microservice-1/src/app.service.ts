import { PrismaCrudService } from 'nestjs-prisma-crud';
import { firstValueFrom } from 'rxjs';

import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService extends PrismaCrudService implements OnModuleInit {
  constructor(
    @Inject('TEST_SERVICE_PUBLISHER') private readonly client: ClientProxy,
  ) {
    super({
      model: 'movie',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  private readonly logger = new Logger();

  async sendRMQMessage(message: string) {
    const record = new RmqRecordBuilder(message).build();

    this.logger.debug(`Sending message: ${record.data}`);

    const data = await firstValueFrom(this.client.send('test-event', record));

    this.logger.debug(`Received message: ${data}`);

    return data;
  }

  async onModuleInit() {
    await this.client.connect();
  }
}
