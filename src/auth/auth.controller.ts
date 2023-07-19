import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';

import { CreateUserRequest } from '../user/payload/request/create-user.request';
import { CreateUserCommand, CreateUserUseCase } from '../user/use-cases/create-user.use-case';
import { UserEFilter } from '../user/user.filter';
import { AuthEFilter } from './auth.filter';
import { IsPublic } from './decorators/is-public.decorator';
import { SignInRequest } from './payload/request/sign-in.request';
import { SignInResponse } from './payload/response/sign-in.response';
import { SignInCommand, SignInUseCase } from './use-cases/sign-in.use-case';

@UseFilters(AuthEFilter, UserEFilter)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @IsPublic()
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<SignInResponse> {
    return this.signInUseCase
      .exec(SignInCommand.fromSignInRequest(req))
      .then((accessToken) => new SignInResponse(accessToken));
  }

  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-up')
  async signUp(@Body() req: CreateUserRequest): Promise<{}> {
    return this.createUserUseCase.exec(CreateUserCommand.fromCreateUserRequest(req));
  }
}
