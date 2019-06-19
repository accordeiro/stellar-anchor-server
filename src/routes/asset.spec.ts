import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import { Connection, createConnection, getRepository } from "typeorm";
import app from "../app";
import { Asset } from "../entity/Asset";
import { DBTest } from "../utils/DBTest";

chai.use(chaiHttp);
let dbTest: DBTest;
let conn: Connection;

const createTestAssets = async (): Promise<Asset[]> => {
  const assets: Asset[] = [
    new Asset("USDT", true, 2.0, 0.01, 100.0, 10000.0),
    new Asset(
      "EURT",
      true,
      1.0,
      0.05,
      50.0,
      100000.0,
      true,
      1.0,
      0.05,
      200.0,
      10000.0,
    ),
  ];

  const assetRepo = getRepository(Asset);
  const dbAssets = assets.map(async asset => assetRepo.save(asset));

  return Promise.all(dbAssets);
};

describe("Asset APIs", () => {
  before(async () => {
    conn = await createConnection();
    dbTest = new DBTest(conn);
  });

  beforeEach(async () => {
    await dbTest.cleanUp();
    await dbTest.createAdminUser();
  });

  after(async () => {
    await conn.close();
  });

  it("Should allow admins to list assets", async () => {
    const token = await dbTest.getAdminJWT();
    await createTestAssets();

    return chai
      .request(app)
      .get("/api/v1/assets/")
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.length).to.be.equal(2);
      });
  });

  it("Should forbid unauthenticated users to list assets", async () => {
    await createTestAssets();

    return chai
      .request(app)
      .get("/api/v1/assets/")
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should serve all fields correctly", async () => {
    const token = await dbTest.getAdminJWT();
    await createTestAssets();

    return chai
      .request(app)
      .get("/api/v1/assets/")
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        const usdtAsset = res.body.filter(
          (entry: { name: string }) => entry.name === "USDT",
        )[0];
        const eurtAsset = res.body.filter(
          (entry: { name: string }) => entry.name === "EURT",
        )[0];
        chai.expect(usdtAsset).to.include({
          name: "USDT",
          depositEnabled: true,
          depositFeeFixed: 2.0,
          depositFeePercent: 0.01,
          depositMinAmount: 100.0,
          depositMaxAmount: 10000.0,
          withdrawalEnabled: false,
        });
        chai.expect(usdtAsset.id).to.not.be.null;

        chai.expect(eurtAsset).to.include({
          name: "EURT",
          depositEnabled: true,
          depositFeeFixed: 1.0,
          depositFeePercent: 0.05,
          depositMinAmount: 50.0,
          depositMaxAmount: 100000.0,
          withdrawalEnabled: true,
          withdrawalFeeFixed: 1.0,
          withdrawalFeePercent: 0.05,
          withdrawalMinAmount: 200.0,
          withdrawalMaxAmount: 10000.0,
        });
        chai.expect(eurtAsset.id).to.not.be.null;
      });
  });

  it("Should allow admins to create assets", async () => {
    const token = await dbTest.getAdminJWT();
    const asset = {
      name: "EURT",
      depositEnabled: true,
      depositFeeFixed: 1.0,
      depositFeePercent: 0.05,
      depositMinAmount: 50.0,
      depositMaxAmount: 100000.0,
      withdrawalEnabled: true,
      withdrawalFeeFixed: 1.0,
      withdrawalFeePercent: 0.05,
      withdrawalMinAmount: 200.0,
      withdrawalMaxAmount: 10000.0,
    };

    return chai
      .request(app)
      .post("/api/v1/assets/")
      .send(asset)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res.body).to.include({
          name: "EURT",
          depositEnabled: true,
          depositFeeFixed: 1.0,
          depositFeePercent: 0.05,
          depositMinAmount: 50.0,
          depositMaxAmount: 100000.0,
          withdrawalEnabled: true,
          withdrawalFeeFixed: 1.0,
          withdrawalFeePercent: 0.05,
          withdrawalMinAmount: 200.0,
          withdrawalMaxAmount: 10000.0,
        });
        chai.expect(res.body.id).to.not.be.null;
        chai.expect(res).to.have.status(201);
      });
  });

  it("Should not allow unnamed assets", async () => {
    const token = await dbTest.getAdminJWT();
    const asset = {
      name: "",
    };

    return chai
      .request(app)
      .post("/api/v1/assets/")
      .send(asset)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(400);
      });
  });

  it("Should not allow assets with names smaller than 4 chars", async () => {
    const token = await dbTest.getAdminJWT();
    const asset = {
      name: "ASD",
    };

    return chai
      .request(app)
      .post("/api/v1/assets/")
      .send(asset)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(400);
      });
  });

  it("Should allow creating new assets by simply providing a valid name", async () => {
    const token = await dbTest.getAdminJWT();
    const asset = {
      name: "EURT",
    };

    return chai
      .request(app)
      .post("/api/v1/assets/")
      .send(asset)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(201);
      });
  });

  it("Should forbid unauthenticated users to edit assets", async () => {
    const assets = await createTestAssets();
    const dbAssetId = assets[0].id;
    const assetPatch = {
      name: "ANOTHERNAME",
    };

    return chai
      .request(app)
      .patch(`/api/v1/assets/${dbAssetId}`)
      .send(assetPatch)
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should allow admins to make patches", async () => {
    const token = await dbTest.getAdminJWT();
    const assets = await createTestAssets();
    const dbAssetId = assets[1].id;
    const assetPatch = {
      name: "ANOTHERNAME",
    };

    return chai
      .request(app)
      .patch(`/api/v1/assets/${dbAssetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(assetPatch)
      .then(res => {
        chai.expect(res.body).to.include({
          name: "ANOTHERNAME",
          depositEnabled: true,
          depositFeeFixed: 1.0,
          depositFeePercent: 0.05,
          depositMinAmount: 50.0,
          depositMaxAmount: 100000.0,
          withdrawalEnabled: true,
          withdrawalFeeFixed: 1.0,
          withdrawalFeePercent: 0.05,
          withdrawalMinAmount: 200.0,
          withdrawalMaxAmount: 10000.0,
        });
        chai.expect(res).to.have.status(200);
      });
  });

  it("Should allow admins to delete assets", async () => {
    const token = await dbTest.getAdminJWT();
    const assets = await createTestAssets();
    const firstAssetId = assets[0].id;

    return chai
      .request(app)
      .delete(`/api/v1/assets/${firstAssetId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(204);
      });
  });
});
