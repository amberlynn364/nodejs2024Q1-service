import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}
  createArtist(data: CreateArtistDto): Promise<Artist> {
    return this.db.artist.create({ data });
  }

  getArtists(): Promise<Artist[]> {
    return this.db.artist.findMany();
  }

  getArtistById(id: Artist['id']): Promise<Artist> {
    return this.db.artist.findUniqueOrThrow({ where: { id } });
  }

  updateArtistById(id: Artist['id'], data: UpdateArtistDto): Promise<Artist> {
    return this.db.artist.update({ where: { id }, data });
  }

  removeArtistById(id: Artist['id']): Promise<Artist> {
    return this.db.artist.delete({ where: { id } });
  }
}
