import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

import { Movie } from '@prisma/client';

export class MovieDTO implements Movie {
  @IsInt()
  id: number;

  @IsString()
  @Length(10, 400)
  name: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
