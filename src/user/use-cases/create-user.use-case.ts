import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { partialPlainToInstance } from '../../lib/extensions/class-transformer';
import { CreateUserRequest } from '../payload/request/create-user.request';
import { User } from '../user.entity';
import { UserAlreadyExistsE } from '../user.error';
import { FindUserByEmailUseCase } from './find-user-by-email.use-case';

// ---- CreateUserCommand ----
export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
  ) {}

  static fromCreateUserRequest(req: CreateUserRequest): CreateUserCommand {
    return new CreateUserCommand(req.email, req.password, req.name);
  }
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async exec(cmd: CreateUserCommand): Promise<{ id: string }> {
    await this.checkUserAlreadyExists(cmd);

    const entity: User = partialPlainToInstance(User, cmd);
    const user: User = await this.userRepository.save(entity);
    return { id: user.id };
  }

  async checkUserAlreadyExists({ email }: CreateUserCommand): Promise<void> {
    const maybeUser = await this.findUserByEmailUseCase.exec(email);
    if (maybeUser) throw new UserAlreadyExistsE();
  }
}
