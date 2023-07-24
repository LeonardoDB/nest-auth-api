import { Exclude, Expose } from 'class-transformer';

import { SignedIn } from '../../use-cases/sign-in.use-case';

@Exclude()
export class SignInResponse {
  @Expose()
  public readonly accessToken: string;

  @Expose()
  public readonly refreshToken: string;

  @Expose()
  public readonly tokenType: string = 'Bearer';

  constructor({ accessToken, refreshToken }: SignedIn) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
