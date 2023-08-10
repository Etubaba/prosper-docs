import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import configuration from '../../../../config';
import { RegisterDto } from '../dto/register.dto';
import { PasswordHash } from '../providers/argon2/password.hash';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { JwtPayload } from '../../../types';
import { PrismaService } from '../../../database/prisma/service/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordHash: PasswordHash,
  ) {}

  async generateNewToken(
    id: string,
    phone: string,
    type: 'access' | 'refresh',
  ): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        phone,
        sub: id,
      },
      {
        secret: <string>configuration().jwt[type].secret,
        expiresIn: configuration().jwt[type].signInOptions.expiresIn,
      },
    );
    return token;
  }

  async registerUser(userDto: RegisterDto): Promise<object> {
    const { email, user_name, password } = userDto;
    //check if the user already exist
    const userExist = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new BadRequestException('Credentials in use');
    }

    //hash user password
    const hashedPassword = await this.passwordHash.hash(password);

    //create user
    const user = await this.prismaService.users.create({
      data: { user_name, email, password: hashedPassword },
    });

    //generate token
    const [accessToken, refreshToken] = await Promise.all([
      this.generateNewToken(user.id, user.email, 'access'),
      this.generateNewToken(user.id, user.email, 'refresh'),
    ]);

    delete user.password;

    return { user, accessToken, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<object> {
    const { email, password } = loginDto;

    //check if user credential is valid
    const user = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    //check if user password is correct

    const isPasswordCorrect = await this.passwordHash.verify(
      user.password,
      password,
    );

    if (!isPasswordCorrect) {
      throw new NotAcceptableException(`User password is incorrect`);
    }

    //generate token
    const [accessToken, refreshToken] = await Promise.all([
      this.generateNewToken(user.id, user.email, 'access'),
      this.generateNewToken(user.id, user.email, 'refresh'),
    ]);

    //delete passord from user details
    delete user.password;

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<object> {
    const { refreshToken } = refreshTokenDto;
    try {
      const { email } = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: configuration().jwt.refresh.secret,
      });

      const user = await this.prismaService.users.findUnique({
        where: {
          email,
        },
      });

      //generate token
      const [accessToken, newRefreshToken] = await Promise.all([
        this.generateNewToken(user.id, user.email, 'access'),
        this.generateNewToken(user.id, user.email, 'refresh'),
      ]);

      //delete passord from user details
      delete user.password;

      return { user, accessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('Token expired');
    }
  }
}
