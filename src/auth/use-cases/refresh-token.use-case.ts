import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../user/user.entity';
import { UserPayload } from '../auth.types';

// ---- RefreshTokenCommand ----
export class RefreshTokenCommand {
  constructor(public readonly user: User) {}
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async exec({ user }: RefreshTokenCommand): Promise<string> {
    const payload: UserPayload = this.buildPayload(user);
    return this.generateAccessToken(payload);
  }

  private buildPayload(user: User): UserPayload {
    return { sub: user.id, email: user.email, name: user.name };
  }

  private generateAccessToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }
}
