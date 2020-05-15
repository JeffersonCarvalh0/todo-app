import {MigrationInterface, QueryRunner} from "typeorm";

export class Todo1589542827187 implements MigrationInterface {
    name = 'Todo1589542827187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "createdAt"`, undefined);
    }

}
