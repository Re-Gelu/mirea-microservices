import { Module } from '@nestjs/common';
import { MovieSessionService } from './movie-session.service';
import { MovieSessionController } from './movie-session.controller';

@Module({
  controllers: [MovieSessionController],
  providers: [MovieSessionService],
})
export class MovieSessionModule {}
