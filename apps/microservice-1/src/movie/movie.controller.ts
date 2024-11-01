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

import { MovieDTO, MovieUpdateDTO } from './dto';
import { MovieService } from './movie.service';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({ type: MovieDTO })
  async create(@Body() data: MovieDTO, @Query('crudQuery') crudQuery: string) {
    await this.movieService.sendTestMessage('NIGGERS');

    return await this.movieService.create(data, {
      crudQuery,
    });
  }

  @Get()
  @ApiQuery({ name: 'crudQuery', required: false })
  @ApiOkResponse({
    type: [MovieDTO],
  })
  async findMany(@Query('crudQuery') crudQuery: string) {
    await this.movieService.sendTestMessage('Movies: findMany');

    return await this.movieService.findMany({ crudQuery });
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
    return await this.movieService.findOne(id, { crudQuery });
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
    return await this.movieService.update(id, data, {
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
    return this.movieService.remove(id, { crudQuery });
  }
}
