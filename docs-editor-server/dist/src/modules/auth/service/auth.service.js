"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../../../config");
const password_hash_1 = require("../providers/argon2/password.hash");
const prisma_service_1 = require("../../../database/prisma/service/prisma.service");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, passwordHash) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.passwordHash = passwordHash;
    }
    async generateNewToken(id, phone, type) {
        const token = await this.jwtService.signAsync({
            phone,
            sub: id,
        }, {
            secret: (0, config_1.default)().jwt[type].secret,
            expiresIn: (0, config_1.default)().jwt[type].signInOptions.expiresIn,
        });
        return token;
    }
    async registerUser(userDto) {
        const { email, user_name, password } = userDto;
        const userExist = await this.prismaService.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userExist) {
            throw new common_1.BadRequestException('Credentials in use');
        }
        const hashedPassword = await this.passwordHash.hash(password);
        const user = await this.prismaService.users.create({
            data: { user_name, email, password: hashedPassword },
        });
        const [accessToken, refreshToken] = await Promise.all([
            this.generateNewToken(user.id, user.email, 'access'),
            this.generateNewToken(user.id, user.email, 'refresh'),
        ]);
        delete user.password;
        return { user, accessToken, refreshToken };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prismaService.users.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const isPasswordCorrect = await this.passwordHash.verify(user.password, password);
        if (!isPasswordCorrect) {
            throw new common_1.NotAcceptableException(`User password is incorrect`);
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.generateNewToken(user.id, user.email, 'access'),
            this.generateNewToken(user.id, user.email, 'refresh'),
        ]);
        delete user.password;
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        try {
            const { email } = this.jwtService.verify(refreshToken, {
                secret: (0, config_1.default)().jwt.refresh.secret,
            });
            const user = await this.prismaService.users.findUnique({
                where: {
                    email,
                },
            });
            const [accessToken, newRefreshToken] = await Promise.all([
                this.generateNewToken(user.id, user.email, 'access'),
                this.generateNewToken(user.id, user.email, 'refresh'),
            ]);
            delete user.password;
            return { user, accessToken, refreshToken: newRefreshToken };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Token expired');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        password_hash_1.PasswordHash])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map