import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './routes/users/users.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './logging/logging.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DbModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    LoggingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
