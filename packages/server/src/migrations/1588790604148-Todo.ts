import {MigrationInterface, QueryRunner} from "typeorm";

export class Todo1588790604148 implements MigrationInterface {
    name = 'Todo1588790604148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text NOT NULL, "done" boolean NOT NULL DEFAULT false, "createdById" integer, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_435d346a98cd4b729a772c35514" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_435d346a98cd4b729a772c35514"`, undefined);
        await queryRunner.query(`DROP TABLE "todo"`, undefined);
    }

}
