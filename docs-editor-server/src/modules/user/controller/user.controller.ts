import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserDetails(@Param('id') id: string) {
    return await this.userService.userDetails(id);
  }
}
