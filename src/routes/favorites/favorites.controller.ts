import {
  Controller,
  Post,
  Param,
  Delete,
  UnprocessableEntityException,
  HttpCode,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AlbumIdParams } from '../album/params/albumId.params';
import { Album, Artist, Track } from 'src/types';
import { ArtistIdParams } from '../artist/params/artistId.params';
import { TrackIdParams } from '../track/params/trackId.params';
import { FavoritesResp } from './types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritesResp {
    return this.favoritesService.getFavorites();
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param() params: AlbumIdParams): Album['id'] {
    const id = this.favoritesService.addAlbumToFavorites(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param() params: AlbumIdParams): void {
    const id = this.favoritesService.removeAlbumFromFavorites(params.id);
    if (id === null) throw new NotFoundException();
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param() params: ArtistIdParams): Artist['id'] {
    const id = this.favoritesService.addArtistToFavorites(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param() params: ArtistIdParams): void {
    const id = this.favoritesService.removeArtistFromFavorites(params.id);
    if (id === null) throw new NotFoundException();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param() params: TrackIdParams): Track['id'] {
    const id = this.favoritesService.addTrackToFavorites(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param() params: TrackIdParams): void {
    const id = this.favoritesService.removeTrackFromFavorites(params.id);
    if (id === null) throw new NotFoundException();
  }
}
