import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from 'src/types';

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: Album['name'];

  @IsPositive()
  year: Album['year'];

  @IsOptional()
  @IsUUID(4)
  artistId: Album['artistId'] = null;
}
