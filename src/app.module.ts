import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './routes/users/users.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';

@Module({
  imports: [UsersModule, DbModule, TrackModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
