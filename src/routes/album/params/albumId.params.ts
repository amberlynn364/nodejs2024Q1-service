import { IsUUID } from 'class-validator';
import { Album } from 'src/types';

export class AlbumIdParams implements Pick<Album, 'id'> {
  @IsUUID(4)
  id: Album['id'];
}
