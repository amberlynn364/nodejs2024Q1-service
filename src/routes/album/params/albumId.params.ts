import { Album } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class AlbumIdParams implements Pick<Album, 'id'> {
  @IsUUID(4)
  id: Album['id'];
}
