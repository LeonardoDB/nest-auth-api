import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshTokenResponse {
  @Expose()
  public readonly accessToken: string;

  @Expose()
  public readonly tokenType: string = 'Bearer';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
