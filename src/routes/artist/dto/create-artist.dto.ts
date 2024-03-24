import { Artist } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: Artist['name'];

  @IsBoolean()
  grammy: Artist['grammy'];
}
