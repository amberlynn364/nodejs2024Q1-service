import { Album, Artist, Track } from '@prisma/client';

export interface FavoritesResp {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
