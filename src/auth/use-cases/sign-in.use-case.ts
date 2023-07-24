import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

// ---- SignedIn ----
export class SignedIn {
  constructor(public readonly accessToken: string, public readonly refreshToken: string) {}
}

@Injectable()
export class SignInUseCase {
  private readonly refreshTokenExpireIn: string = this.configService.get<string>(
    'auth.refreshTokenExpireIn',
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly validateCredentialUseCase: ValidateCredentialUseCase,
    private readonly configService: ConfigService,
  ) {}

  async exec(cmd: SignInCommand): Promise<SignedIn> {
    const user: User = await this.validateCredentialUseCase.exec(cmd);

    const payload: UserPayload = this.buildPayload(user);
    const accessToken: string = this.generateAccessToken(payload);
    const refreshToken: string = this.generateRefreshToken(payload);

    return new SignedIn(accessToken, refreshToken);
  }

  private buildPayload(user: User): UserPayload {
    return { sub: user.id, email: user.email, name: user.name };
  }

  private generateAccessToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: UserPayload): string {
    return this.jwtService.sign(payload, { expiresIn: this.refreshTokenExpireIn });
  }
}
