import { IsUUID } from 'class-validator';
import { Artist } from 'src/types';

export class ArtistIdParams implements Pick<Artist, 'id'> {
  @IsUUID(4)
  id: Artist['id'];
}
