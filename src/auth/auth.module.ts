import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { ValidateCredentialUseCase } from './use-cases/validate-credentials.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.secret'),
        signOptions: { expiresIn: configService.get<string>('auth.accessTokenExpireIn') },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    RefreshJwtStrategy,
    SignInUseCase,
    ValidateCredentialUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
