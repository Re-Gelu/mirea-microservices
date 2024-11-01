import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { PrismaCrudModule } from 'nestjs-prisma-crud';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieSessionModule } from './movie-session/movie-session.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),

    PrismaCrudModule.register({
      prismaService: PrismaService,
      accessControl: {
        authDataKey: 'user',
        getRolesFromAuthDataFn: (authenticatedUser) => authenticatedUser?.roles,
        strict: false,
      },
    }),

    MovieModule,
    MovieSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
