import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { ValidateCredentialUseCase } from './use-cases/validate-credentials.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, SignInUseCase, ValidateCredentialUseCase],
})
export class AuthModule {}
