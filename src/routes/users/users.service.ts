import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updateUserPassword.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  createUser(data: CreateUserDto): Promise<User> {
    return this.db.user.create({ data });
  }

  getUser(id: User['id']): Promise<User> {
    return this.db.user.findUniqueOrThrow({ where: { id } });
  }

  getUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async updatePassword(
    id: User['id'],
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> | null {
    const user = await this.db.user.findUniqueOrThrow({ where: { id } });
    if (user.password !== oldPassword) return null;
    return this.db.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
    });
  }

  removeUser(id: User['id']): Promise<User> {
    return this.db.user.delete({ where: { id } });
  }
}
