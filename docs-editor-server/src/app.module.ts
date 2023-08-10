import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configs from '../config';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { PrismaService } from './database/prisma/service/prisma.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configs], isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
