import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { channel } from 'diagnostics_channel';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('test-event')
  getTestMessage(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);

  }
}
