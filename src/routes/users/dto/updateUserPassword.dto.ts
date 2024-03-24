import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: User['password'];

  @IsString()
  @IsNotEmpty()
  newPassword: User['password'];
}
