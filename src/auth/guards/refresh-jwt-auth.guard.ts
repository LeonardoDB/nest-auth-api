import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthUnauthorizedE } from '../auth.error';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActivatePromise = canActivate as Promise<boolean>;
    return canActivatePromise.catch((error) => {
      if (error instanceof AuthUnauthorizedE) throw new UnauthorizedException(error.message);
      throw new UnauthorizedException();
    });
  }
}
