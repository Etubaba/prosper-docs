import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { PasswordHash } from '../providers/argon2/password.hash';
import { UnauthorizedException } from '@nestjs/common';
import configuration from '../../../../config';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let prismaService: PrismaService;
  let passwordHash: PasswordHash;

  const mockEmail = 'laptop@gmail.cin';

  const mockJwtService = {
    verify: jest.fn().mockReturnValueOnce({ email: mockEmail }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        PasswordHash,
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },

        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    passwordHash = moduleRef.get<PasswordHash>(PasswordHash);
  });

  test('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  describe('generateNewToken', () => {
    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA4MTMzODg2MDg0Iiwic3ViIjoiNjQ4YWI3YzhmM2QyN2IwNzkwYTc3OTUyIiwiaWF0IjoxNjg2ODEyNzI1LCJleHAiOjE2ODk0MDQ3MjV9.W3ICY0xf6PIGpS7DJQROBJP9L7q54tXkYOZIyLJTU_c';
    const mockId = 'mock-id';
    const mockEmail = 'mock-email@gmail.com';
    const mockType = 'access';

    it('should generate a new token with the correct parameters', async () => {
      const expiresIn = 'mock-expires-in';
      const secret = 'mock-secret';
      jest.spyOn(authService, 'generateNewToken').mockResolvedValue(mockToken);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken);

      const result = await authService.generateNewToken(
        mockId,
        mockEmail,
        mockType,
      );

      expect(result).toBe(mockToken);
    });
  });

  describe('Register new user', () => {
    const mockUserDto = {
      email: `fulaama@gmail.com`,
      user_name: 'Mallam Kai',
      password: 'password',
    };

    it('should register a new user', async () => {
      const mockUser = {
        id: 'ekeje',
        password: mockUserDto.password,
        email: mockUserDto.email,
        user_name: mockUserDto.user_name,
      };

      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);
      jest
        .spyOn(passwordHash, 'hash')
        .mockResolvedValue('mock-hashed-password');
      jest
        .spyOn(prismaService.users, 'create')
        .mockResolvedValue(mockUser as any);
      jest
        .spyOn(authService, 'generateNewToken')
        .mockResolvedValueOnce(mockAccessToken)
        .mockResolvedValueOnce(mockRefreshToken);

      const result = await authService.registerUser(mockUserDto);

      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockUserDto.email,
        },
      });
      expect(passwordHash.hash).toHaveBeenCalledWith(mockUserDto.password);
      expect(prismaService.users.create).toHaveBeenCalledWith({
        data: {
          email: mockUserDto.email,
          user_name: mockUserDto.user_name,
          password: 'mock-hashed-password',
        },
      });

      expect(authService.generateNewToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        'access',
      );
      expect(authService.generateNewToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        'refresh',
      );

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          user_name: mockUser.user_name,
        },
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });

    it('should throw BadRequestException if the user already exists', async () => {
      const mockUser = {
        id: 'ekeje',
        password: mockUserDto.password,
        email: mockUserDto.email,
        user_name: mockUserDto.user_name,
      };
      jest
        .spyOn(prismaService.users, 'findUnique')
        .mockResolvedValue(mockUser as any);

      await expect(authService.registerUser(mockUserDto)).rejects.toThrowError(
        'Credentials in use',
      );

      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockUserDto.email,
        },
      });
    });
  });

  describe('Login user', () => {
    const mockLoginDto = {
      email: '08122334433',
      password: 'password',
    };

    it('should login a user and return the user details and tokens', async () => {
      const mockUser = {
        id: 'mock-id',
        email: mockLoginDto.email,
        password: 'mock-hashed-password',
      };

      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      jest
        .spyOn(prismaService.users, 'findUnique')
        .mockResolvedValue(mockUser as any);
      jest.spyOn(passwordHash, 'verify').mockResolvedValue(true);
      jest
        .spyOn(authService, 'generateNewToken')
        .mockResolvedValueOnce(mockAccessToken)
        .mockResolvedValueOnce(mockRefreshToken);

      const result = await authService.login(mockLoginDto);

      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockLoginDto.email,
        },
      });

      expect(authService.generateNewToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        'access',
      );
      expect(authService.generateNewToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        'refresh',
      );
      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
        },
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });

    it('should throw ForbiddenException if user does not exist', async () => {
      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);

      await expect(authService.login(mockLoginDto)).rejects.toThrowError(
        'Invalid credentials',
      );

      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockLoginDto.email,
        },
      });
    });

    it('should throw NotAcceptableException if user password is incorrect', async () => {
      const mockUser = {
        id: 'mock-id',
        email: mockLoginDto.email,
        password: 'mock-hashed-password',
      };

      jest
        .spyOn(prismaService.users, 'findUnique')
        .mockResolvedValue(mockUser as any);
      jest.spyOn(passwordHash, 'verify').mockResolvedValue(false);

      await expect(authService.login(mockLoginDto)).rejects.toThrowError(
        'User password is incorrect',
      );

      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockLoginDto.email,
        },
      });
      expect(passwordHash.verify).toHaveBeenCalledWith(
        mockUser.password,
        mockLoginDto.password,
      );
    });
  });

  describe('User can refresh token', () => {
    const mockRefreshTokenDto = {
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA4MTMzODg2MDg0Iiwic3ViIjoiNjQ4YWI3YzhmM2QyN2IwNzkwYTc3OTUyIiwiaWF0IjoxNjg2ODEyNzI1LCJleHAiOjE2ODk0MDQ3MjV9.W3ICY0xf6PIGpS7DJQROBJP9L7q54tXkYOZIyLJTU_c',
    };

    it('should throw an UnauthorizedException if the token is expired', async () => {
      const refreshTokenDto = { refreshToken: 'expired-refresh-token' };
      jwtService.verify = jest.fn().mockImplementation(() => {
        throw new Error('Token expired');
      });

      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should refresh the token and return the user details, access token, and new refresh token', async () => {
      const refreshTokenDto = { refreshToken: 'sample-refresh-token' };
      const verifiedJwtPayload = { email: '1234ssms@gmail.com' };
      const user = {
        id: 1,
        email: '1234ssms@gmail.com',
        password: 'password',
      };
      const accessToken = 'sample-access-token';
      const newRefreshToken = 'sample-new-refresh-token';

      jwtService.verify = jest.fn().mockReturnValue(verifiedJwtPayload);
      prismaService.users.findUnique = jest.fn().mockResolvedValue(user);
      authService.generateNewToken = jest
        .fn()
        .mockResolvedValueOnce(accessToken)
        .mockResolvedValueOnce(newRefreshToken);

      const result = await authService.refreshToken(refreshTokenDto);

      expect(jwtService.verify).toHaveBeenCalledWith('sample-refresh-token', {
        secret: configuration().jwt.refresh.secret,
      });
      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: { email: '1234ssms@gmail.com' },
      });
      expect(authService.generateNewToken).toHaveBeenCalledWith(
        user.id,
        user.email,
        'access',
      );
      expect(authService.generateNewToken).toHaveBeenCalledWith(
        user.id,
        user.email,
        'refresh',
      );
      expect(result).toEqual({
        user: { id: 1, email: '1234ssms@gmail.com' },
        accessToken: 'sample-access-token',
        refreshToken: 'sample-new-refresh-token',
      });
    });
  });
});
