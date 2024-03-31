import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { Tokens } from 'src/types';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly db: DbService,
  ) {}
  async signup({ login, password }: LoginDto): Promise<User> {
    const hashRounds = Number.parseInt(this.configService.get('CRYPT_SALT'));
    const passwordHash = await hash(password, hashRounds);

    return this.db.user.create({
      data: {
        login,
        password: passwordHash,
      },
    });
  }
  async login({ login, password }: LoginDto): Promise<Tokens | null> {
    const user = await this.db.user.findFirst({ where: { login } });
    if (!(await compare(password, user.password))) return null;
    return this.generateTokens(user);
  }
  async refresh(id: User['id']): Promise<Tokens | null> {
    const user = await this.db.user.findUnique({ where: { id } });
    return this.generateTokens(user);
  }

  private async generateTokens({ id, login }: User): Promise<Tokens> {
    const payload = { userId: id, login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
