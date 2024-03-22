import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TemporaryDatabase } from 'src/temporaryDatabase/temporaryDatabase';
import { Album, Artist, Favorites, Track, User } from 'src/types';

@Injectable()
// export class DbService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
// }
export class DbService {
  public user = new TemporaryDatabase<User>();
  public track = new TemporaryDatabase<Track>();
  public album = new TemporaryDatabase<Album>();
  public artist = new TemporaryDatabase<Artist>();
  public favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
