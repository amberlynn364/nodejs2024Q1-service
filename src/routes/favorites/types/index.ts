import { Album, Artist, Track } from 'src/types';

export interface FavoritesResp {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
