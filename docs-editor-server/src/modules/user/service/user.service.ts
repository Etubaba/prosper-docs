import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async userDetails(id: string): Promise<object> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        user_name: true,
        email: true,
        documents: true,
      },
    });
    return user;
  }
}
