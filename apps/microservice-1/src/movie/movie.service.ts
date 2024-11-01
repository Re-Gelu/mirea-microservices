import { PrismaCrudService } from 'nestjs-prisma-crud';

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class MovieService extends PrismaCrudService {
  constructor(@Inject('TEST_SERVICE') private client: ClientProxy) {
    super({
      model: 'movie',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  async sendTestMessage(message: string) {
    const record = new RmqRecordBuilder(message).build();

    this.client.send('test-event', record).subscribe();
  }
}
