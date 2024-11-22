import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { MovieDTO, MovieUpdateDTO } from './dto';

@ApiTags('movie')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-rmq-message')
  async sendRMQMessage(@Query('data') data: string) {
    return await this.appService.sendRMQMessage(data);
  }

  @Post()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieDTO })
  async create(@Body() data: MovieDTO, @Query('crudQuery') crudQuery: string) {
    return await this.appService.create(data, {
      crudQuery,
    });
  }

  @Get()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({
    type: [MovieDTO],
  })
  async findMany(@Query('crudQuery') crudQuery: string) {
    await this.appService.sendRMQMessage('Movies: findMany');

    return await this.appService.findMany({ crudQuery });
  }

  @Get(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({
    type: MovieDTO,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.appService.findOne(id, { crudQuery });
  }

  @Patch(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({
    type: [MovieDTO],
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MovieUpdateDTO,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.appService.update(id, data, {
      crudQuery,
    });
  }

  @Delete(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({
    type: [MovieDTO],
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    return this.appService.remove(id, { crudQuery });
  }
}
