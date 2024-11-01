import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {
 


  getHello(): string {
    return 'Hello World!';
  }
  
  
}
