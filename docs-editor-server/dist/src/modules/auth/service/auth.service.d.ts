import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { PasswordHash } from '../providers/argon2/password.hash';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly passwordHash;
    constructor(prismaService: PrismaService, jwtService: JwtService, passwordHash: PasswordHash);
    generateNewToken(id: string, phone: string, type: 'access' | 'refresh'): Promise<string>;
    registerUser(userDto: RegisterDto): Promise<object>;
    login(loginDto: LoginDto): Promise<object>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<object>;
}
