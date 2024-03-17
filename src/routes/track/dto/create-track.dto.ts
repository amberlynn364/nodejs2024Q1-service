import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Track } from 'src/types';

export class CreateTrackDto implements Omit<Track, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: Track['name'];

  @IsOptional()
  @IsUUID(4)
  artistId: Track['artistId'] = null;

  @IsOptional()
  @IsUUID(4)
  albumId: Track['albumId'] = null;

  @IsPositive()
  duration: Track['duration'];
}
