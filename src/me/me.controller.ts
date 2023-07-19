import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Controller()
export class MeController {
  @Get('me')
  async getProfile(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
