import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import { Connection, createConnection, getRepository } from "typeorm";
import app from "../app";
import { InfoField } from "../entity/InfoField";
import { DBTest } from "../utils/DBTest";

chai.use(chaiHttp);
let dbTest: DBTest;
let conn: Connection;

const createTestInfoFields = async (): Promise<InfoField[]> => {
  const infoFields: InfoField[] = [
    new InfoField(
      "email_address",
      "your email address for transaction status updates",
      true,
    ),
    new InfoField("amount", "amount in USD that you plan to deposit", false),
    new InfoField("type", "type of deposit to make", false, [
      "SEPA",
      "SWIFT",
      "cash",
    ]),
  ];

  const infoFieldRepo = getRepository(InfoField);
  const dbInfoFields = infoFields.map(async infof => infoFieldRepo.save(infof));

  return Promise.all(dbInfoFields);
};

describe("InfoField APIs", () => {
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

  it("Should allow admins to list info fields", async () => {
    const token = await dbTest.getAdminJWT();
    await createTestInfoFields();

    return chai
      .request(app)
      .get("/api/v1/info_fields/")
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.length).to.be.equal(3);
      });
  });

  it("Should forbid unauthenticated users to list info fields", async () => {
    await createTestInfoFields();

    return chai
      .request(app)
      .get("/api/v1/info_fields/")
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should serve all fields correctly", async () => {
    const token = await dbTest.getAdminJWT();
    await createTestInfoFields();

    return chai
      .request(app)
      .get("/api/v1/info_fields/")
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        // email_address, amount, type
        const emailIF = res.body.filter(
          (entry: { name: string }) => entry.name === "email_address",
        )[0];
        const amountIF = res.body.filter(
          (entry: { name: string }) => entry.name === "amount",
        )[0];
        const typeIF = res.body.filter(
          (entry: { name: string }) => entry.name === "type",
        )[0];

        chai.expect(emailIF).to.include({
          name: "email_address",
          description: "your email address for transaction status updates",
          optional: true,
        });
        chai.expect(emailIF.choices).to.be.an("array").that.is.empty;

        chai.expect(amountIF).to.include({
          name: "amount",
          description: "amount in USD that you plan to deposit",
          optional: false,
        });
        chai.expect(amountIF.choices).to.be.an("array").that.is.empty;

        chai.expect(typeIF).to.include({
          name: "type",
          description: "type of deposit to make",
          optional: false,
        });
        chai.expect(typeIF.choices).to.eql(["SEPA", "SWIFT", "cash"]);

        chai.expect(res).to.have.status(200);
      });
  });

  it("Should allow admins to create info fields", async () => {
    const token = await dbTest.getAdminJWT();
    const infoField = {
      name: "type",
      description: "type of deposit to make",
      optional: true,
      choices: ["SWIFT", "cash"],
    };

    return chai
      .request(app)
      .post("/api/v1/info_fields/")
      .send(infoField)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res.body).to.include({
          name: "type",
          description: "type of deposit to make",
          optional: true,
        });
        chai.expect(res.body.choices).to.eql(["SWIFT", "cash"]);
        chai.expect(res.body.id).to.not.be.null;
        chai.expect(res).to.have.status(201);
      });
  });

  it("Should not allow unnamed infoFields", async () => {
    const token = await dbTest.getAdminJWT();
    const infoField = {
      name: "",
      description: "type of deposit to make",
      optional: true,
      choices: ["SWIFT", "cash"],
    };

    return chai
      .request(app)
      .post("/api/v1/info_fields/")
      .send(infoField)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(400);
      });
  });

  it("Should allow not providing `optional` and `choices` for info fields, and use default values", async () => {
    const token = await dbTest.getAdminJWT();
    const infoField = {
      name: "type",
      description: "type of deposit to make",
    };

    return chai
      .request(app)
      .post("/api/v1/info_fields/")
      .send(infoField)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res.body).to.include({
          name: "type",
          description: "type of deposit to make",
          optional: true,
        });
        chai.expect(res.body.choices).to.eql([]);
        chai.expect(res.body.id).to.not.be.null;
        chai.expect(res).to.have.status(201);
      });
  });

  it("Should forbid unauthenticated users to edit info fields", async () => {
    const infoFields = await createTestInfoFields();
    const infoFieldId = infoFields[0].id;
    const infoFieldPatch = {
      name: "email",
    };

    return chai
      .request(app)
      .patch(`/api/v1/info_fields/${infoFieldId}`)
      .send(infoFieldPatch)
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should allow admins to make patches", async () => {
    const token = await dbTest.getAdminJWT();
    const infoFields = await createTestInfoFields();
    const infoFieldTypeId = infoFields[2].id;
    const infoFieldPatch = {
      name: "method",
    };

    return chai
      .request(app)
      .patch(`/api/v1/info_fields/${infoFieldTypeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(infoFieldPatch)
      .then(res => {
        chai.expect(res.body).to.include({
          name: "method",
          description: "type of deposit to make",
          optional: false,
        });
        chai.expect(res.body.choices).to.eql(["SEPA", "SWIFT", "cash"]);
        chai.expect(res).to.have.status(200);
      });
  });

  it("Should allow admins to delete info fields", async () => {
    const token = await dbTest.getAdminJWT();
    const infoFields = await createTestInfoFields();
    const firstInfoFieldId = infoFields[0].id;

    return chai
      .request(app)
      .delete(`/api/v1/info_fields/${firstInfoFieldId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(res => {
        chai.expect(res).to.have.status(204);
      });
  });
});
