const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1737564975213 {
    name = 'Migrations1737564975213'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "prefix" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_roles_roles" (
                "usersId" varchar NOT NULL,
                "rolesId" varchar NOT NULL,
                PRIMARY KEY ("usersId", "rolesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_df951a64f09865171d2d7a502b"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_users_roles_roles" (
                "usersId" varchar NOT NULL,
                "rolesId" varchar NOT NULL,
                CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("usersId", "rolesId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_users_roles_roles"("usersId", "rolesId")
            SELECT "usersId",
                "rolesId"
            FROM "users_roles_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "users_roles_roles"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_users_roles_roles"
                RENAME TO "users_roles_roles"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_df951a64f09865171d2d7a502b"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
                RENAME TO "temporary_users_roles_roles"
        `);
        await queryRunner.query(`
            CREATE TABLE "users_roles_roles" (
                "usersId" varchar NOT NULL,
                "rolesId" varchar NOT NULL,
                PRIMARY KEY ("usersId", "rolesId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users_roles_roles"("usersId", "rolesId")
            SELECT "usersId",
                "rolesId"
            FROM "temporary_users_roles_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_users_roles_roles"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_df951a64f09865171d2d7a502b"
        `);
        await queryRunner.query(`
            DROP TABLE "users_roles_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
    }
}
