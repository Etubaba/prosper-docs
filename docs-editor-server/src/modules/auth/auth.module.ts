import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './providers/strategy';
import { PasswordHash } from './providers/argon2/password.hash';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtStrategy, PasswordHash, AuthService],
  exports: [AuthService, PasswordHash],
  controllers: [AuthController],
})
export class AuthModule {}
