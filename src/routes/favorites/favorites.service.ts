import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoritesResp } from './types';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  async getFavorites(): Promise<FavoritesResp> {
    const [albums, artists, tracks] = await this.db.$transaction([
      this.db.favoriteAlbum.findMany({ include: { item: true } }),
      this.db.favoriteArtist.findMany({ include: { item: true } }),
      this.db.favoriteTrack.findMany({ include: { item: true } }),
    ]);
    return {
      albums: albums.map(({ item }) => item),
      artists: artists.map(({ item }) => item),
      tracks: tracks.map(({ item }) => item),
    };
  }

  async addAlbumToFavorites(id: Album['id']): Promise<Album> {
    const { item } = await this.db.favoriteAlbum.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return item;
  }

  async removeAlbumFromFavorites(id: Album['id']): Promise<Album> {
    const { item } = await this.db.favoriteAlbum.delete({
      where: { id },
      include: { item: true },
    });
    return item;
  }

  async addArtistToFavorites(id: Artist['id']): Promise<Artist> {
    const { item } = await this.db.favoriteArtist.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return item;
  }

  async removeArtistFromFavorites(id: Artist['id']): Promise<Artist> {
    const { item } = await this.db.favoriteArtist.delete({
      where: { id },
      include: { item: true },
    });
    return item;
  }

  async addTrackToFavorites(id: Track['id']): Promise<Track> {
    const { item } = await this.db.favoriteTrack.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return item;
  }

  async removeTrackFromFavorites(id: Track['id']): Promise<Track> {
    const { item } = await this.db.favoriteTrack.delete({
      where: { id },
      include: { item: true },
    });
    return item;
  }
}
