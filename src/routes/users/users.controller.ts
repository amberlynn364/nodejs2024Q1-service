import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { userIdParams } from './params/userId.params';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updateUserPassword.dto';
import { AccessGuard } from 'src/auth/guards/access.guard';

@UseGuards(AccessGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async getUser(@Param() { id }: userIdParams): Promise<UserEntity> {
    const user = await this.userService.getUser(id);
    return new UserEntity(user);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDto);
    return new UserEntity(user);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() { id }: userIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.userService.updatePassword(id, updatePasswordDto);
    if (!user) throw new ForbiddenException('oldPassword is wrong');
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeUser(@Param() { id }: userIdParams): Promise<void> {
    await this.userService.removeUser(id);
  }
}
