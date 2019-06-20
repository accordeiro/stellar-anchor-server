import {MigrationInterface, QueryRunner} from "typeorm";

export class AssetRelatedEntities1561066919606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "info_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "optional" boolean NOT NULL DEFAULT (0), "choices" text NOT NULL, CONSTRAINT "UQ_303c5097ec45c5f7d0d577345d6" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "withdrawal_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_1f04d37dfd16f9e15182a28b66e" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "depositEnabled" boolean NOT NULL, "depositFeeFixed" double NOT NULL, "depositFeePercent" double NOT NULL, "depositMinAmount" double NOT NULL, "depositMaxAmount" double NOT NULL, "withdrawalEnabled" boolean NOT NULL, "withdrawalFeeFixed" double NOT NULL, "withdrawalFeePercent" double NOT NULL, "withdrawalMinAmount" double NOT NULL, "withdrawalMaxAmount" double NOT NULL, CONSTRAINT "UQ_119b2d1c1bdccc42057c303c44f" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "withdrawal_type_info_fields_info_field" ("withdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("withdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3cf35f97931ff20d36d68baac" ON "withdrawal_type_info_fields_info_field" ("withdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_75f7187df7663d039f3e5123da" ON "withdrawal_type_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_withdrawal_type" ("assetId" integer NOT NULL, "withdrawalTypeId" integer NOT NULL, PRIMARY KEY ("assetId", "withdrawalTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dac47fdc61c3489c24c49c0666" ON "asset_withdrawal_types_withdrawal_type" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06af4e7b9dfd5669b73d50fd2a" ON "asset_withdrawal_types_withdrawal_type" ("withdrawalTypeId") `);
        await queryRunner.query(`DROP INDEX "IDX_e3cf35f97931ff20d36d68baac"`);
        await queryRunner.query(`DROP INDEX "IDX_75f7187df7663d039f3e5123da"`);
        await queryRunner.query(`CREATE TABLE "temporary_withdrawal_type_info_fields_info_field" ("withdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, CONSTRAINT "FK_e3cf35f97931ff20d36d68baacf" FOREIGN KEY ("withdrawalTypeId") REFERENCES "withdrawal_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_75f7187df7663d039f3e5123da3" FOREIGN KEY ("infoFieldId") REFERENCES "info_field" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("withdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "temporary_withdrawal_type_info_fields_info_field"("withdrawalTypeId", "infoFieldId") SELECT "withdrawalTypeId", "infoFieldId" FROM "withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_withdrawal_type_info_fields_info_field" RENAME TO "withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_e3cf35f97931ff20d36d68baac" ON "withdrawal_type_info_fields_info_field" ("withdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_75f7187df7663d039f3e5123da" ON "withdrawal_type_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, CONSTRAINT "FK_549dacce05e08b331720ebedf60" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_6da2cc5507d75b71b684e3cbac0" FOREIGN KEY ("infoFieldId") REFERENCES "info_field" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_deposit_info_fields_info_field"("assetId", "infoFieldId") SELECT "assetId", "infoFieldId" FROM "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_deposit_info_fields_info_field" RENAME TO "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`DROP INDEX "IDX_dac47fdc61c3489c24c49c0666"`);
        await queryRunner.query(`DROP INDEX "IDX_06af4e7b9dfd5669b73d50fd2a"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_withdrawal_types_withdrawal_type" ("assetId" integer NOT NULL, "withdrawalTypeId" integer NOT NULL, CONSTRAINT "FK_dac47fdc61c3489c24c49c06663" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_06af4e7b9dfd5669b73d50fd2a9" FOREIGN KEY ("withdrawalTypeId") REFERENCES "withdrawal_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetId", "withdrawalTypeId"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_withdrawal_types_withdrawal_type"("assetId", "withdrawalTypeId") SELECT "assetId", "withdrawalTypeId" FROM "asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_withdrawal_types_withdrawal_type" RENAME TO "asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_dac47fdc61c3489c24c49c0666" ON "asset_withdrawal_types_withdrawal_type" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06af4e7b9dfd5669b73d50fd2a" ON "asset_withdrawal_types_withdrawal_type" ("withdrawalTypeId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_06af4e7b9dfd5669b73d50fd2a"`);
        await queryRunner.query(`DROP INDEX "IDX_dac47fdc61c3489c24c49c0666"`);
        await queryRunner.query(`ALTER TABLE "asset_withdrawal_types_withdrawal_type" RENAME TO "temporary_asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_withdrawal_type" ("assetId" integer NOT NULL, "withdrawalTypeId" integer NOT NULL, PRIMARY KEY ("assetId", "withdrawalTypeId"))`);
        await queryRunner.query(`INSERT INTO "asset_withdrawal_types_withdrawal_type"("assetId", "withdrawalTypeId") SELECT "assetId", "withdrawalTypeId" FROM "temporary_asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_06af4e7b9dfd5669b73d50fd2a" ON "asset_withdrawal_types_withdrawal_type" ("withdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dac47fdc61c3489c24c49c0666" ON "asset_withdrawal_types_withdrawal_type" ("assetId") `);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`ALTER TABLE "asset_deposit_info_fields_info_field" RENAME TO "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "asset_deposit_info_fields_info_field"("assetId", "infoFieldId") SELECT "assetId", "infoFieldId" FROM "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`DROP INDEX "IDX_75f7187df7663d039f3e5123da"`);
        await queryRunner.query(`DROP INDEX "IDX_e3cf35f97931ff20d36d68baac"`);
        await queryRunner.query(`ALTER TABLE "withdrawal_type_info_fields_info_field" RENAME TO "temporary_withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "withdrawal_type_info_fields_info_field" ("withdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("withdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "withdrawal_type_info_fields_info_field"("withdrawalTypeId", "infoFieldId") SELECT "withdrawalTypeId", "infoFieldId" FROM "temporary_withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_75f7187df7663d039f3e5123da" ON "withdrawal_type_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3cf35f97931ff20d36d68baac" ON "withdrawal_type_info_fields_info_field" ("withdrawalTypeId") `);
        await queryRunner.query(`DROP INDEX "IDX_06af4e7b9dfd5669b73d50fd2a"`);
        await queryRunner.query(`DROP INDEX "IDX_dac47fdc61c3489c24c49c0666"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_withdrawal_type"`);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP INDEX "IDX_75f7187df7663d039f3e5123da"`);
        await queryRunner.query(`DROP INDEX "IDX_e3cf35f97931ff20d36d68baac"`);
        await queryRunner.query(`DROP TABLE "withdrawal_type_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "info_field"`);
    }

}
