import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { Artist } from 'src/types';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}
  createArtist(createArtistDto: CreateArtistDto): Artist {
    return this.db.artist.createData(createArtistDto);
  }

  getArtists(): Artist[] {
    return this.db.artist.getData();
  }

  getArtistById(id: Artist['id']): Artist | null {
    return this.db.artist.getDataById(id);
  }

  updateArtistById(
    id: Artist['id'],
    updateArtistDto: UpdateArtistDto,
  ): Artist | null {
    return this.db.artist.updateData(id, updateArtistDto);
  }

  removeArtistById(id: Artist['id']): Artist | null {
    const tracks = this.db.track.getDatasByField('artistId', id);
    tracks.forEach(({ id }) =>
      this.db.track.updateData(id, { artistId: null }),
    );
    return this.db.artist.deleteData(id);
  }
}
