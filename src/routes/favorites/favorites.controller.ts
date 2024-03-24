import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Get,
  UseFilters,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AlbumIdParams } from '../album/params/albumId.params';
import { ArtistIdParams } from '../artist/params/artistId.params';
import { TrackIdParams } from '../track/params/trackId.params';
import { FavoritesResp } from './types';
import { Album, Artist, Track } from '@prisma/client';
import { PrismaClientExceptionFilter } from './exception.filter';

@UseFilters(PrismaClientExceptionFilter)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): Promise<FavoritesResp> {
    return this.favoritesService.getFavorites();
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param() params: AlbumIdParams): Promise<Album> {
    return this.favoritesService.addAlbumToFavorites(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(
    @Param() params: AlbumIdParams,
  ): Promise<void> {
    await this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param() params: ArtistIdParams): Promise<Artist> {
    return this.favoritesService.addArtistToFavorites(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(
    @Param() params: ArtistIdParams,
  ): Promise<void> {
    await this.favoritesService.removeArtistFromFavorites(params.id);
  }

  @Post('track/:id')
  addTrackToFavorites(@Param() params: TrackIdParams): Promise<Track> {
    return this.favoritesService.addTrackToFavorites(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(
    @Param() params: TrackIdParams,
  ): Promise<void> {
    const id = this.favoritesService.removeTrackFromFavorites(params.id);
    if (id === null) throw new NotFoundException();
  }
}
