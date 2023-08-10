import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { PrismaService } from '../../../database/prisma/service/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUserDetails', () => {
    it('should call the userService.userDetails method with id passed', async () => {
      const userDetails = {
        id: 'isisnsnns',
        email: 'moon@gmail.com',
        user_name: 'Malvin',
        documents: [],
        document_permission: [],
      };

      userService.userDetails = jest.fn().mockResolvedValueOnce(userDetails);

      const result = await userController.getUserDetails(userDetails.id);

      expect(userService.userDetails).toHaveBeenCalledWith('isisnsnns');
      expect(result).toBe(userDetails);
    });
  });
});
