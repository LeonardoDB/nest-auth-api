import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1680614411441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user
      (
        id         VARCHAR(36)  NOT NULL PRIMARY KEY,
        email      VARCHAR(255) NOT NULL UNIQUE,
        password   VARCHAR(255) NOT NULL,
        name       VARCHAR(255) NOT NULL,
        created_at DATETIME     NOT NULL,
        updated_at DATETIME     NOT NULL,
        deleted_at DATETIME     NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE user;
    `);
  }
}
