import {MigrationInterface, QueryRunner} from "typeorm";

export class AssetInfo1560537460885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "info_field" ("name" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "optional" boolean NOT NULL, "choices" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type" ("name" varchar PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "asset" ("name" varchar PRIMARY KEY NOT NULL, "depositEnabled" boolean NOT NULL, "depositFeeFixed" double NOT NULL, "depositFeePercent" double NOT NULL, "depositMinAmount" double NOT NULL, "depositMaxAmount" double NOT NULL, "withdrawalEnabled" boolean NOT NULL, "withdrawalFeeFixed" double NOT NULL, "withdrawalFeePercent" double NOT NULL, "withdrawalMinAmount" double NOT NULL, "withdrawalMaxAmount" double NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, PRIMARY KEY ("assetWithdrawalTypeName", "infoFieldName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_424d8a1ca88850589b35422fc7" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f8b4f032615c9e79e8029a3ff" ON "asset_withdrawal_type_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, PRIMARY KEY ("assetName", "infoFieldName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8309b5c1017a42e6a186b774d" ON "asset_deposit_info_fields_info_field" ("assetName") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1a9628ad1fb4d2d0aca83b215" ON "asset_deposit_info_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_asset_withdrawal_type" ("assetName" varchar NOT NULL, "assetWithdrawalTypeName" varchar NOT NULL, PRIMARY KEY ("assetName", "assetWithdrawalTypeName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7249213e29ecc51a7ccd8bfcd3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetName") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6d78b013763d04b358009e7f3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeName") `);
        await queryRunner.query(`DROP INDEX "IDX_424d8a1ca88850589b35422fc7"`);
        await queryRunner.query(`DROP INDEX "IDX_2f8b4f032615c9e79e8029a3ff"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, CONSTRAINT "FK_424d8a1ca88850589b35422fc75" FOREIGN KEY ("assetWithdrawalTypeName") REFERENCES "asset_withdrawal_type" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_2f8b4f032615c9e79e8029a3ffe" FOREIGN KEY ("infoFieldName") REFERENCES "info_field" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetWithdrawalTypeName", "infoFieldName"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_withdrawal_type_fields_info_field"("assetWithdrawalTypeName", "infoFieldName") SELECT "assetWithdrawalTypeName", "infoFieldName" FROM "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_withdrawal_type_fields_info_field" RENAME TO "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_424d8a1ca88850589b35422fc7" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f8b4f032615c9e79e8029a3ff" ON "asset_withdrawal_type_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`DROP INDEX "IDX_c8309b5c1017a42e6a186b774d"`);
        await queryRunner.query(`DROP INDEX "IDX_a1a9628ad1fb4d2d0aca83b215"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_deposit_info_fields_info_field" ("assetName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, CONSTRAINT "FK_c8309b5c1017a42e6a186b774d3" FOREIGN KEY ("assetName") REFERENCES "asset" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a1a9628ad1fb4d2d0aca83b215d" FOREIGN KEY ("infoFieldName") REFERENCES "info_field" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetName", "infoFieldName"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_deposit_info_fields_info_field"("assetName", "infoFieldName") SELECT "assetName", "infoFieldName" FROM "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_deposit_info_fields_info_field" RENAME TO "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_c8309b5c1017a42e6a186b774d" ON "asset_deposit_info_fields_info_field" ("assetName") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1a9628ad1fb4d2d0aca83b215" ON "asset_deposit_info_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`DROP INDEX "IDX_7249213e29ecc51a7ccd8bfcd3"`);
        await queryRunner.query(`DROP INDEX "IDX_a6d78b013763d04b358009e7f3"`);
        await queryRunner.query(`CREATE TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type" ("assetName" varchar NOT NULL, "assetWithdrawalTypeName" varchar NOT NULL, CONSTRAINT "FK_7249213e29ecc51a7ccd8bfcd31" FOREIGN KEY ("assetName") REFERENCES "asset" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a6d78b013763d04b358009e7f3b" FOREIGN KEY ("assetWithdrawalTypeName") REFERENCES "asset_withdrawal_type" ("name") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("assetName", "assetWithdrawalTypeName"))`);
        await queryRunner.query(`INSERT INTO "temporary_asset_withdrawal_types_asset_withdrawal_type"("assetName", "assetWithdrawalTypeName") SELECT "assetName", "assetWithdrawalTypeName" FROM "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type" RENAME TO "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_7249213e29ecc51a7ccd8bfcd3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetName") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6d78b013763d04b358009e7f3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeName") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a6d78b013763d04b358009e7f3"`);
        await queryRunner.query(`DROP INDEX "IDX_7249213e29ecc51a7ccd8bfcd3"`);
        await queryRunner.query(`ALTER TABLE "asset_withdrawal_types_asset_withdrawal_type" RENAME TO "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_types_asset_withdrawal_type" ("assetName" varchar NOT NULL, "assetWithdrawalTypeName" varchar NOT NULL, PRIMARY KEY ("assetName", "assetWithdrawalTypeName"))`);
        await queryRunner.query(`INSERT INTO "asset_withdrawal_types_asset_withdrawal_type"("assetName", "assetWithdrawalTypeName") SELECT "assetName", "assetWithdrawalTypeName" FROM "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_a6d78b013763d04b358009e7f3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetWithdrawalTypeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_7249213e29ecc51a7ccd8bfcd3" ON "asset_withdrawal_types_asset_withdrawal_type" ("assetName") `);
        await queryRunner.query(`DROP INDEX "IDX_a1a9628ad1fb4d2d0aca83b215"`);
        await queryRunner.query(`DROP INDEX "IDX_c8309b5c1017a42e6a186b774d"`);
        await queryRunner.query(`ALTER TABLE "asset_deposit_info_fields_info_field" RENAME TO "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "asset_deposit_info_fields_info_field" ("assetName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, PRIMARY KEY ("assetName", "infoFieldName"))`);
        await queryRunner.query(`INSERT INTO "asset_deposit_info_fields_info_field"("assetName", "infoFieldName") SELECT "assetName", "infoFieldName" FROM "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_a1a9628ad1fb4d2d0aca83b215" ON "asset_deposit_info_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8309b5c1017a42e6a186b774d" ON "asset_deposit_info_fields_info_field" ("assetName") `);
        await queryRunner.query(`DROP INDEX "IDX_2f8b4f032615c9e79e8029a3ff"`);
        await queryRunner.query(`DROP INDEX "IDX_424d8a1ca88850589b35422fc7"`);
        await queryRunner.query(`ALTER TABLE "asset_withdrawal_type_fields_info_field" RENAME TO "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE TABLE "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName" varchar NOT NULL, "infoFieldName" varchar NOT NULL, PRIMARY KEY ("assetWithdrawalTypeName", "infoFieldName"))`);
        await queryRunner.query(`INSERT INTO "asset_withdrawal_type_fields_info_field"("assetWithdrawalTypeName", "infoFieldName") SELECT "assetWithdrawalTypeName", "infoFieldName" FROM "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "temporary_asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`CREATE INDEX "IDX_2f8b4f032615c9e79e8029a3ff" ON "asset_withdrawal_type_fields_info_field" ("infoFieldName") `);
        await queryRunner.query(`CREATE INDEX "IDX_424d8a1ca88850589b35422fc7" ON "asset_withdrawal_type_fields_info_field" ("assetWithdrawalTypeName") `);
        await queryRunner.query(`DROP INDEX "IDX_a6d78b013763d04b358009e7f3"`);
        await queryRunner.query(`DROP INDEX "IDX_7249213e29ecc51a7ccd8bfcd3"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_types_asset_withdrawal_type"`);
        await queryRunner.query(`DROP INDEX "IDX_a1a9628ad1fb4d2d0aca83b215"`);
        await queryRunner.query(`DROP INDEX "IDX_c8309b5c1017a42e6a186b774d"`);
        await queryRunner.query(`DROP TABLE "asset_deposit_info_fields_info_field"`);
        await queryRunner.query(`DROP INDEX "IDX_2f8b4f032615c9e79e8029a3ff"`);
        await queryRunner.query(`DROP INDEX "IDX_424d8a1ca88850589b35422fc7"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type_fields_info_field"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "asset_withdrawal_type"`);
        await queryRunner.query(`DROP TABLE "info_field"`);
    }

}
