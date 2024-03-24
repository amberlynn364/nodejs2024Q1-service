import { Artist } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class ArtistIdParams implements Pick<Artist, 'id'> {
  @IsUUID(4)
  id: Artist['id'];
}
