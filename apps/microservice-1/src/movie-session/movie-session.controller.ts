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

import { MovieSessionDTO, MovieSessionUpdateDTO } from './dto';
import { MovieSessionService } from './movie-session.service';

@ApiTags('movie-session')
@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @Post()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async create(
    @Body() data: MovieSessionDTO,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.movieSessionService.create(data, {
      crudQuery,
    });
  }

  @Get()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: [MovieSessionDTO] })
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.movieSessionService.findMany({ crudQuery });
  }

  @Get(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.movieSessionService.findOne(id, { crudQuery });
  }

  @Patch(':id')
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieSessionDTO })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MovieSessionUpdateDTO,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.movieSessionService.update(id, data, {
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
    return this.movieSessionService.remove(id, { crudQuery });
  }
}
