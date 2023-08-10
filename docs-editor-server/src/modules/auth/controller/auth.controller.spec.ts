import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { PasswordHash } from '../providers/argon2/password.hash';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../database/prisma/service/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PasswordHash, PrismaService, JwtService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('registerUser', () => {
    it('should call the authService.registerUser method with the provided registerDto', async () => {
      const registerDto: RegisterDto = {
        password: '12345',
        email: 'smssss@gmail.com',
        user_name: 'Michael Angel',
      };
      authService.registerUser = jest.fn().mockResolvedValueOnce('registered');

      const result = await authController.registerUser(registerDto);

      expect(authService.registerUser).toHaveBeenCalledWith(registerDto);
      expect(result).toBe('registered');
    });
  });

  describe('login', () => {
    it('should call the authService.login method with the provided loginDto', async () => {
      const loginDto: LoginDto = {
        password: '12345',
        email: 'reezc@gmail.com',
      };
      authService.login = jest.fn().mockResolvedValueOnce('loggedIn');

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toBe('loggedIn');
    });
  });

  describe('refresh', () => {
    it('should call the authService.refreshToken method with the provided refreshTokenDto', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'remdwknwjkjkjnwdlwlmwklk',
      };
      authService.refreshToken = jest.fn().mockResolvedValueOnce('refreshed');

      const result = await authController.refresh(refreshTokenDto);

      expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
      expect(result).toBe('refreshed');
    });
  });
});
