import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistIdParams } from './params/artistId.params';
import { Artist } from '@prisma/client';
import { AccessGuard } from 'src/auth/guards/access.guard';

@UseGuards(AccessGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() { id }: ArtistIdParams): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Put(':id')
  updateArtistById(
    @Param() { id }: ArtistIdParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtistById(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeArtistById(@Param() { id }: ArtistIdParams): Promise<void> {
    await this.artistService.removeArtistById(id);
  }
}
