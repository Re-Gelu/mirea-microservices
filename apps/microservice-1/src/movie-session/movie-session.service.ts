import { PrismaCrudService } from 'nestjs-prisma-crud';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MovieSessionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'movieSession',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
