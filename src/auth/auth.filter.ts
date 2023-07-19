import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { AuthE, AuthInvalidCredentialE, AuthUnauthorizedE } from './auth.error';

@Catch(AuthUnauthorizedE, AuthInvalidCredentialE)
export class AuthEFilter implements ExceptionFilter {
  catch<T extends AuthE>(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode;
    switch (exception.name) {
      case AuthUnauthorizedE.name:
        statusCode = HttpStatus.UNAUTHORIZED;
        break;
      case AuthInvalidCredentialE.name:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const message = exception.message;
    const error = exception.name;

    response.status(statusCode).json({ statusCode, message, error });
  }
}
