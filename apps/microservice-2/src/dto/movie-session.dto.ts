import { IsDateString, IsInt, IsOptional, Max } from 'class-validator';

import { MovieSession } from '@prisma/client';

export class MovieSessionDTO implements MovieSession {
  @IsInt()
  id: number;

  @IsDateString()
  datetime: Date;

  @IsInt()
  @Max(100)
  @IsOptional()
  maxSeats: number;

  @IsInt()
  movieId: number;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
