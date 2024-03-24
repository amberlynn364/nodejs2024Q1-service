import { Track } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class TrackIdParams implements Pick<Track, 'id'> {
  @IsUUID(4)
  id: Track['id'];
}
