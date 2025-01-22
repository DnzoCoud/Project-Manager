import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737578970813 implements MigrationInterface {
    name = 'InitialMigration1737578970813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "prefix" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "name", "prefix") SELECT "id", "name", "prefix" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "email", "password", "created_at", "updated_at") SELECT "id", "firstName", "lastName", "email", "password", "created_at", "updated_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_roles_role" ("userId" varchar NOT NULL, "roleId" varchar NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_roles_role" RENAME TO "user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "prefix" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "name", "prefix") SELECT "id", "name", "prefix" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "email", "password", "created_at", "updated_at") SELECT "id", "firstName", "lastName", "email", "password", "created_at", "updated_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_roles_role" RENAME TO "user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_roles_role" RENAME TO "user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" RENAME TO "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_roles_role"`);
        await queryRunner.query(`DROP TABLE "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" RENAME TO "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" varchar NOT NULL, "roleId" varchar NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_roles_role"`);
        await queryRunner.query(`DROP TABLE "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "email", "password", "created_at", "updated_at") SELECT "id", "firstName", "lastName", "email", "password", "created_at", "updated_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "prefix" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "role"("id", "name", "prefix") SELECT "id", "name", "prefix" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" RENAME TO "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" varchar NOT NULL, "roleId" varchar NOT NULL, CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_roles_role"`);
        await queryRunner.query(`DROP TABLE "temporary_user_roles_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "email", "password", "created_at", "updated_at") SELECT "id", "firstName", "lastName", "email", "password", "created_at", "updated_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "prefix" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "role"("id", "name", "prefix") SELECT "id", "name", "prefix" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
    }

}
