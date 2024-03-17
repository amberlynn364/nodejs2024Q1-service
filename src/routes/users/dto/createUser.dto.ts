import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/types';

export class CreateUserDto implements Pick<User, 'login' | 'password'> {
  @IsString()
  @IsNotEmpty()
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  password: User['password'];
}
