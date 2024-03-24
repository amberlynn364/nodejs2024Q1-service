import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class UserEntity implements User {
  id: User['id'];
  login: User['login'];
  version: User['version'];

  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
