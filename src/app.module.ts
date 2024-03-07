import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './routes/users/users.module';
import { TrackModule } from './routes/track/track.module';

@Module({
  imports: [UsersModule, DbModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
