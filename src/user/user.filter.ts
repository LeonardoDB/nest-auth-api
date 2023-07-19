import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { UserAlreadyExistsE, UserE } from './user.error';

@Catch(UserAlreadyExistsE)
export class UserEFilter implements ExceptionFilter {
  catch<T extends UserE>(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode;
    switch (exception.name) {
      case UserAlreadyExistsE.name:
        statusCode = HttpStatus.CONFLICT;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const message = exception.message;
    const error = exception.name;

    response.status(statusCode).json({ statusCode, message, error });
  }
}
