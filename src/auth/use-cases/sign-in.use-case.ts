import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../user/user.entity';
import { UserPayload } from '../auth.types';
import { SignInRequest } from '../payload/request/sign-in.request';
import { ValidateCredentialUseCase } from './validate-credentials.use-case';

// ---- SignInCommand ----
export class SignInCommand {
  constructor(public readonly username: string, public readonly password: string) {}

  static fromSignInRequest(req: SignInRequest): SignInCommand {
    return new SignInCommand(req.username, req.password);
  }
}

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateCredentialUseCase: ValidateCredentialUseCase,
  ) {}

  async exec(cmd: SignInCommand): Promise<string> {
    const user: User = await this.validateCredentialUseCase.exec(cmd);
    const payload: UserPayload = this.buildPayload(user);
    return this.generateAccessToken(payload);
  }

  private buildPayload(user: User): UserPayload {
    return { sub: user.id, email: user.email, name: user.name };
  }

  private generateAccessToken(payload: UserPayload): string {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }
}
