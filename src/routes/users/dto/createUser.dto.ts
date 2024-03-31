import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Pick<User, 'login' | 'password'> {
  @IsString()
  @IsNotEmpty()
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  password: User['password'];
}
