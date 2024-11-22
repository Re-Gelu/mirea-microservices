import { PartialType } from '@nestjs/mapped-types';

import { MovieSessionDTO } from './movie-session.dto';

export class MovieSessionUpdateDTO extends PartialType(MovieSessionDTO) {}
