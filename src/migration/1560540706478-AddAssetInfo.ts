import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAssetInfo1560540706478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "info_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "optional" boolean NOT NULL, "choices" text NOT NULL, CONSTRAINT "UQ_303c5097ec45c5f7d0d577345d6" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_bdd592a8789be7363032511024b" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "depositEnabled" boolean NOT NULL, "depositFeeFixed" double NOT NULL, "depositFeePercent" double NOT NULL, "depositMinAmount" double NOT NULL, "depositMaxAmount" double NOT NULL, "withdrawalEnabled" boolean NOT NULL, "withdrawalFeeFixed" double NOT NULL, "withdrawalFeePercent" double NOT NULL, "withdrawalMinAmount" double NOT NULL, "withdrawalMaxAmount" double NOT NULL, CONSTRAINT "UQ_119b2d1c1bdccc42057c303c44f" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetWithdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7633dc855fc6e3febba8dddc33" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51cf87e58c8b574e91b0d4d479" ON "asset_withdrawal_type_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_asset_withdrawal_type" ("assetId" integer NOT NULL, "assetWithdrawalTypeId" integer NOT NULL, PRIMARY KEY ("assetId", "assetWithdrawalTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c196ea6435ffaab2e5f0fe74f" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f2c3ef1619b2650a0b86c51fe" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeId") `);
        await queryRunner.query(`DROP INDEX "IDX_7633dc855fc6e3febba8dddc33"`);
        await queryRunner.query(`DROP INDEX "IDX_51cf87e58c8b574e91b0d4d479"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, CONSTRAINT "FK_7633dc855fc6e3febba8dddc33b" FOREIGN KEY ("assetWithdrawalTypeId") REFERENCES "asset_withdrawal_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_51cf87e58c8b574e91b0d4d479c" FOREIGN KEY ("infoFieldId") REFERENCES "info_field" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetWithdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_withdrawal_type_fields_info_field"("assetWithdrawalTypeId", "infoFieldId") SELECT "assetWithdrawalTypeId", "infoFieldId" FROM "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_withdrawal_type_fields_info_field" RENAME TO "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_7633dc855fc6e3febba8dddc33" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51cf87e58c8b574e91b0d4d479" ON "asset_withdrawal_type_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, CONSTRAINT "FK_549dacce05e08b331720ebedf60" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_6da2cc5507d75b71b684e3cbac0" FOREIGN KEY ("infoFieldId") REFERENCES "info_field" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_deposit_info_fields_info_field"("assetId", "infoFieldId") SELECT "assetId", "infoFieldId" FROM "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_deposit_info_fields_info_field" RENAME TO "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`DROP INDEX "IDX_7c196ea6435ffaab2e5f0fe74f"`);
        await queryRunner.query(`DROP INDEX "IDX_1f2c3ef1619b2650a0b86c51fe"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type" ("assetId" integer NOT NULL, "assetWithdrawalTypeId" integer NOT NULL, CONSTRAINT "FK_7c196ea6435ffaab2e5f0fe74f4" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_1f2c3ef1619b2650a0b86c51fe8" FOREIGN KEY ("assetWithdrawalTypeId") REFERENCES "asset_withdrawal_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetId", "assetWithdrawalTypeId"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_withdrawal_types_asset_withdrawal_type"("assetId", "assetWithdrawalTypeId") SELECT "assetId", "assetWithdrawalTypeId" FROM "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type" RENAME TO "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_7c196ea6435ffaab2e5f0fe74f" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f2c3ef1619b2650a0b86c51fe" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_1f2c3ef1619b2650a0b86c51fe"`);
        await queryRunner.query(`DROP INDEX "IDX_7c196ea6435ffaab2e5f0fe74f"`);
        await queryRunner.query(`ALTER TABLE "asset_withdrawal_types_asset_withdrawal_type" RENAME TO "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_asset_withdrawal_type" ("assetId" integer NOT NULL, "assetWithdrawalTypeId" integer NOT NULL, PRIMARY KEY ("assetId", "assetWithdrawalTypeId"))`);
        await queryRunner.query(`INSERT INTO "asset_withdrawal_types_asset_withdrawal_type"("assetId", "assetWithdrawalTypeId") SELECT "assetId", "assetWithdrawalTypeId" FROM "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_1f2c3ef1619b2650a0b86c51fe" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c196ea6435ffaab2e5f0fe74f" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetId") `);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`ALTER TABLE "asset_deposit_info_fields_info_field" RENAME TO "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "asset_deposit_info_fields_info_field"("assetId", "infoFieldId") SELECT "assetId", "infoFieldId" FROM "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_6da2cc5507d75b71b684e3cbac" ON "asset_deposit_info_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_549dacce05e08b331720ebedf6" ON "asset_deposit_info_fields_info_field" ("assetId") `);
        await queryRunner.query(`DROP INDEX "IDX_51cf87e58c8b574e91b0d4d479"`);
        await queryRunner.query(`DROP INDEX "IDX_7633dc855fc6e3febba8dddc33"`);
        await queryRunner.query(`ALTER TABLE "asset_withdrawal_type_fields_info_field" RENAME TO "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId" integer NOT NULL, "infoFieldId" integer NOT NULL, PRIMARY KEY ("assetWithdrawalTypeId", "infoFieldId"))`);
        await queryRunner.query(`INSERT INTO "asset_withdrawal_type_fields_info_field"("assetWithdrawalTypeId", "infoFieldId") SELECT "assetWithdrawalTypeId", "infoFieldId" FROM "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_51cf87e58c8b574e91b0d4d479" ON "asset_withdrawal_type_fields_info_field" ("infoFieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7633dc855fc6e3febba8dddc33" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeId") `);
        await queryRunner.query(`DROP INDEX "IDX_1f2c3ef1619b2650a0b86c51fe"`);
        await queryRunner.query(`DROP INDEX "IDX_7c196ea6435ffaab2e5f0fe74f"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP INDEX "IDX_6da2cc5507d75b71b684e3cbac"`);
        await queryRunner.query(`DROP INDEX "IDX_549dacce05e08b331720ebedf6"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP INDEX "IDX_51cf87e58c8b574e91b0d4d479"`);
        await queryRunner.query(`DROP INDEX "IDX_7633dc855fc6e3febba8dddc33"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "info_field"`);
    }

}
