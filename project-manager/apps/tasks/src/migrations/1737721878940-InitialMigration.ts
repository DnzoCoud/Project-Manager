import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737721878940 implements MigrationInterface {
    name = 'InitialMigration1737721878940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "deadline" datetime NOT NULL, "status" varchar CHECK( "status" IN ('todo','progress','complete') ) NOT NULL DEFAULT ('todo'), "projectId" integer, "assignedUserId" integer, "assignedTeamId" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
