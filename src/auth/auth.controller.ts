import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/routes/users/entities/user.entity';
import { RequestWithUserId, Tokens } from 'src/types';
import { RefreshGuard } from './guards/refresh.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.authService.signup(loginDto);
    return new UserEntity(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Tokens> {
    const tokens = await this.authService.login(loginDto);
    if (!tokens) throw new ForbiddenException();
    return tokens;
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Request() request: RequestWithUserId): Promise<Tokens> {
    return this.authService.refresh(request.userId);
  }
}
