import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserRequest } from '../user/payload/request/create-user.request';
import { CreateUserCommand, CreateUserUseCase } from '../user/use-cases/create-user.use-case';
import { User } from '../user/user.entity';
import { UserEFilter } from '../user/user.filter';
import { AuthEFilter } from './auth.filter';
import { CurrentUser } from './decorators/current-user.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { SignInRequest } from './payload/request/sign-in.request';
import { RefreshTokenResponse } from './payload/response/refresh-token.response';
import { SignInResponse } from './payload/response/sign-in.response';
import { RefreshTokenCommand, RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { SignInCommand, SignInUseCase } from './use-cases/sign-in.use-case';

@UseFilters(AuthEFilter, UserEFilter)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  /**
   * Sign In
   */
  @IsPublic()
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<SignInResponse> {
    return this.signInUseCase
      .exec(SignInCommand.fromSignInRequest(req))
      .then((res) => new SignInResponse(res));
  }

  /**
   * Refresh token
   */
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@CurrentUser() currentUser: User): Promise<RefreshTokenResponse> {
    return this.refreshTokenUseCase
      .exec(new RefreshTokenCommand(currentUser))
      .then((accessToken) => new RefreshTokenResponse(accessToken));
  }

  /**
   * Sign Up
   */
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-up')
  async signUp(@Body() req: CreateUserRequest): Promise<{}> {
    return this.createUserUseCase.exec(CreateUserCommand.fromCreateUserRequest(req));
  }
}
