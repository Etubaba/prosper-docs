import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../../database/prisma/service/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(UserService).toBeDefined();
    expect(PrismaService).toBeDefined();
  });

  it('should return user details with the passed id', async () => {
    const id = '64d24c02437e7effb827d507';
    const user = {
      id: '64d24c02437e7effb827d507',
      user_name: 'jagaban',
      email: 'jagaban@gmail.com',
      documents: [],
    };
    prismaService.users.findUnique = jest.fn().mockResolvedValueOnce(user);

    const result = await userService.userDetails(id);
    expect(prismaService.users.findUnique).toHaveBeenCalledWith({
      where: { id: '64d24c02437e7effb827d507' },
      select: {
        id: true,
        user_name: true,
        email: true,
        documents: true,
      },
    });
    expect(result).toEqual(user);
  });
});
