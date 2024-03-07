import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';
import { Album } from 'src/types';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}
  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    return this.db.album.createData(createAlbumDto);
  }

  getAlbums(): Album[] {
    return this.db.album.getData();
  }

  getAlbumById(id: Album['id']): Album | null {
    return this.db.album.getDataById(id);
  }

  updateAlbumById(
    id: Album['id'],
    updateAlbumDto: UpdateAlbumDto,
  ): Album | null {
    return this.db.album.updateData(id, updateAlbumDto);
  }

  removeAlbumById(id: Album['id']): Album | null {
    const tracks = this.db.track.getDatasByField('albumId', id);
    tracks.forEach(({ id }) => this.db.track.updateData(id, { albumId: null }));
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return this.db.album.deleteData(id);
  }
}
