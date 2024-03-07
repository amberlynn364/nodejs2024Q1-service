import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/types';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: User['password'];

  @IsString()
  @IsNotEmpty()
  newPassword: User['password'];
}
