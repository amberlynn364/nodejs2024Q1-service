import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { userIdParams } from './params/userId.params';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updateUserPassword.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): UserEntity[] {
    const users = this.userService.getUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  getUser(@Param() { id }: userIdParams): UserEntity {
    const user = this.userService.getUser(id);
    if (!user) throw new NotFoundException();
    return new UserEntity(user);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    const user = this.userService.createUser(createUserDto);
    return new UserEntity(user);
  }

  @Put(':id')
  updateUserPassword(
    @Param() { id }: userIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    const user = this.userService.updatePassword(id, updatePasswordDto);
    if (user === null) throw new NotFoundException();
    if (user === false) throw new ForbiddenException('wrong old password');
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param() { id }: userIdParams): void {
    const user = this.userService.removeUser(id);
    if (!user) throw new NotFoundException();
  }
}
