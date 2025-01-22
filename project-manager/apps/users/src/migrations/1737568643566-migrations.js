const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1737568643566 {
    name = 'Migrations1737568643566'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_users"(
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "password"
                )
            SELECT "id",
                "firstName",
                "lastName",
                "email",
                "password"
            FROM "users"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_users"
                RENAME TO "users"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME TO "temporary_users"
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
            INSERT INTO "users"(
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "password"
                )
            SELECT "id",
                "firstName",
                "lastName",
                "email",
                "password"
            FROM "temporary_users"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_users"
        `);
    }
}
