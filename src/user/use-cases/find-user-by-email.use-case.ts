import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async exec(email: string): Promise<User> {
    const maybeUser: User = await this.userRepository.findOneBy({ email });
    return maybeUser;
  }
}
