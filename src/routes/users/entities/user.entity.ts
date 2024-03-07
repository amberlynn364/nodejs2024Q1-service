import { Exclude } from 'class-transformer';
import { User } from 'src/types';

export class UserEntity implements User {
  id: User['id'];
  login: User['login'];
  version: User['version'];
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];

  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
