import { PartialType } from '@nestjs/mapped-types';

import { MovieDTO } from './movie.dto';

export class MovieUpdateDTO extends PartialType(MovieDTO) {}
