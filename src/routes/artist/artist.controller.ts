import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from 'src/types';
import { ArtistIdParams } from './params/artistId.params';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() { id }: ArtistIdParams) {
    const artist = this.artistService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Patch(':id')
  updateArtistById(
    @Param() { id }: ArtistIdParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.updateArtistById(id, updateArtistDto);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtistById(@Param() { id }: ArtistIdParams) {
    const artist = this.artistService.removeArtistById(id);
    if (!artist) throw new NotFoundException();
  }
}
