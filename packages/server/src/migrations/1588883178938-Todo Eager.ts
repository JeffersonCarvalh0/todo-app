import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoEager1588883178938 implements MigrationInterface {
    name = 'TodoEager1588883178938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_435d346a98cd4b729a772c35514"`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_435d346a98cd4b729a772c35514" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_435d346a98cd4b729a772c35514"`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_435d346a98cd4b729a772c35514" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
