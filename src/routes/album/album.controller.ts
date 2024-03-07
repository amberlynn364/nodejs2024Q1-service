import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/types';
import { AlbumIdParams } from './params/albumId.params';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get()
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() { id }: AlbumIdParams): Album {
    const album = this.albumService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  updateAlbumById(
    @Param() { id }: AlbumIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    const album = this.albumService.updateAlbumById(id, updateAlbumDto);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbumById(@Param() { id }: AlbumIdParams): void {
    const album = this.albumService.removeAlbumById(id);
    if (!album) throw new NotFoundException();
  }
}
