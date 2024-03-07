import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoritesResp } from './types';
import { Album, Artist } from 'src/types';
import { Track } from '../../../dist/types/index';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  getFavorites(): FavoritesResp {
    const { albums, artists, tracks } = this.db.favorites;
    return {
      albums: albums.map((id) => this.db.album.getDataById(id)),
      artists: artists.map((id) => this.db.artist.getDataById(id)),
      tracks: tracks.map((id) => this.db.track.getDataById(id)),
    };
  }

  addAlbumToFavorites(id: Album['id']): Album['id'] | null {
    return this.addToFavorites<Album>(id, 'album');
  }

  removeAlbumFromFavorites(id: Album['id']): Album['id'] | null {
    return this.removeFromFavorites<Album>(id, 'album');
  }

  addArtistToFavorites(id: Artist['id']): Artist['id'] | null {
    return this.addToFavorites<Artist>(id, 'artist');
  }

  removeArtistFromFavorites(id: Artist['id']): Artist['id'] | null {
    return this.removeFromFavorites<Artist>(id, 'artist');
  }

  addTrackToFavorites(id: Track['id']): Track['id'] | null {
    return this.addToFavorites<Track>(id, 'track');
  }

  removeTrackFromFavorites(id: Track['id']): Track['id'] | null {
    return this.removeFromFavorites<Track>(id, 'track');
  }

  private addToFavorites<T extends Album | Artist | Track>(
    id: T['id'],
    collectionType: keyof Omit<DbService, 'favorites' | 'user'>,
  ): T['id'] | null {
    const item = this.db[collectionType].getDataById(id);
    if (!item) return null;

    const items = this.db.favorites[collectionType + 's'] as T['id'][];
    if (!items.includes(id)) items.push(id);

    return id;
  }

  private removeFromFavorites<T extends Album | Artist | Track>(
    id: T['id'],
    collectionType: keyof Omit<DbService, 'favorites' | 'user'>,
  ): T['id'] | null {
    const items = this.db.favorites[collectionType + 's'] as T['id'][];
    const itemIndex = items.indexOf(id);

    if (itemIndex === -1) return null;

    items.splice(itemIndex, 1);

    return id;
  }
}
