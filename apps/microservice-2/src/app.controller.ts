import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { MovieSessionDTO, MovieSessionUpdateDTO } from './dto';

@ApiTags('movie-session')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger();

  @MessagePattern('test-event')
  async getTestMessage(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef(); // Ссылка на канал
    const message = context.getMessage(); // Текущее сообщение

    this.logger.debug(`Received message: ${data}`);

    const sleepTime = data.split('*').length - 1; // Подсчет количества символов *

    this.logger.debug(`Sleeping for ${sleepTime} seconds...`);

    // Симуляция обработки
    await new Promise((resolve) => setTimeout(resolve, sleepTime * 1000));

    this.logger.debug(`Woke up after ${sleepTime} seconds`);

    // Подтверждаем сообщение
    channel.ack(message);

    this.logger.debug(`Success message ack`);

    // Тип что-то меняется
    return data.replaceAll('*', '#');
  }

  @Post()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async create(
    @Body() data: MovieSessionDTO,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.appService.create(data, {
      crudQuery,
    });
  }

  @Get()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: [MovieSessionDTO] })
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.appService.findMany({ crudQuery });
  }

  @Get(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.appService.findOne(id, { crudQuery });
  }

  @Patch(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MovieSessionUpdateDTO,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.appService.update(id, data, {
      crudQuery,
    });
  }

  @Delete(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    return this.appService.remove(id, { crudQuery });
  }
}
