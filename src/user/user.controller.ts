import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';

import { CreateUserRequest } from './payload/request/create-user.request';
import { CreateUserCommand, CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserEFilter } from './user.filter';

@UseFilters(UserEFilter)
@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async create(@Body() req: CreateUserRequest): Promise<{}> {
    return this.createUserUseCase.exec(CreateUserCommand.fromCreateUserRequest(req));
  }
}
