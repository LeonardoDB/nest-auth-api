import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { Timestamps } from '../lib/extensions/typeorm';

@Entity('user')
export class User extends Timestamps {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
