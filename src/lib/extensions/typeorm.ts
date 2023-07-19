import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { getDatetime } from './datetime';

export class Timestamps {
  /**
   * Data de criação
   * @example 2023-05-25T17:09:46.000Z
   */
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  public createdAt: string;

  /**
   * Data da última atualização
   * @example 2023-05-25T17:09:46.000Z
   */
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  public updatedAt: string;

  /**
   * Data de exclusão
   * @example null
   */
  @DeleteDateColumn({ type: 'datetime', nullable: true, name: 'deleted_at' })
  public readonly deletedAt?: string;

  @BeforeInsert()
  _beforeInsert() {
    const now = getDatetime();

    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  _beforeUpdate() {
    this.updatedAt = getDatetime();
  }
}
