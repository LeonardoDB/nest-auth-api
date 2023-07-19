import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { FindUserByEmailUseCase } from '../../user/use-cases/find-user-by-email.use-case';
import { User } from '../../user/user.entity';
import { AuthInvalidCredentialE } from '../auth.error';

// ---- ValidateCredentialCommand ----
export class ValidateCredentialCommand {
  username: string;
  password: string;
}

@Injectable()
export class ValidateCredentialUseCase {
  constructor(private readonly findUserByEmailUseCase: FindUserByEmailUseCase) {}

  async exec(cmd: ValidateCredentialCommand): Promise<User> {
    const user: User = await this.findUserByEmail(cmd.username);
    if (!user) throw new AuthInvalidCredentialE();

    const isPasswordValid: boolean = await bcrypt.compare(cmd.password, user.password);
    if (!isPasswordValid) throw new AuthInvalidCredentialE();

    return user;
  }

  private async findUserByEmail(email: string): Promise<User> {
    return this.findUserByEmailUseCase.exec(email);
  }
}
