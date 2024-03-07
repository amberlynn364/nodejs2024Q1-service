import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/types';
import { UpdatePasswordDto } from './dto/updateUserPassword.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  createUser(createUserDto: CreateUserDto): User {
    return this.db.user.createData({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  getUser(id: User['id']): User | null {
    return this.db.user.getDataById(id);
  }

  getUsers(): User[] {
    return this.db.user.getData();
  }

  updatePassword(
    id: User['id'],
    updatePasswordDto: UpdatePasswordDto,
  ): User | false | null {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.getUser(id);
    if (!user) return null;
    if (user.password !== oldPassword) return false;
    return this.db.user.updateData(id, {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
  }

  updateUserData(id: User['id'], updateUserDto: UpdateUserDto): User | null {
    const user = this.getUser(id);
    if (!user) return null;
    return this.db.user.updateData(id, {
      ...updateUserDto,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
  }

  removeUser(id: User['id']): User | null {
    return this.db.user.deleteData(id);
  }
}
