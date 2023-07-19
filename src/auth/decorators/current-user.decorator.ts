import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../../user/user.entity';

// ---- AuthRequest ----
interface AuthRequest extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
