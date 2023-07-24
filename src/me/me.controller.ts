import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Me')
@Controller()
export class MeController {
  /**
   * Get profile data of the currently authenticated user
   */
  @Get('me')
  async getProfile(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
