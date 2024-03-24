import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumIdParams } from './params/albumId.params';
import { Album } from '@prisma/client';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get()
  getAlbums(): Promise<Album[]> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() { id }: AlbumIdParams): Promise<Album> {
    return this.albumService.getAlbumById(id);
  }

  @Put(':id')
  updateAlbumById(
    @Param() { id }: AlbumIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbumById(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeAlbumById(@Param() { id }: AlbumIdParams): Promise<void> {
    await this.albumService.removeAlbumById(id);
  }
}
