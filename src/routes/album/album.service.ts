import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}
  createAlbum(data: CreateAlbumDto): Promise<Album> {
    return this.db.album.create({ data });
  }

  getAlbums(): Promise<Album[]> {
    return this.db.album.findMany();
  }

  getAlbumById(id: Album['id']): Promise<Album> {
    return this.db.album.findUniqueOrThrow({ where: { id } });
  }

  updateAlbumById(id: Album['id'], data: UpdateAlbumDto): Promise<Album> {
    return this.db.album.update({ where: { id }, data });
  }

  removeAlbumById(id: Album['id']): Promise<Album> {
    return this.db.album.delete({ where: { id } });
  }
}
