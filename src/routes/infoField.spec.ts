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

const createTestInfoFields = async (): Promise<void> => {
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
  for (const infof of infoFields) {
    await infoFieldRepo.save(infof);
  }
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

  it("Should forbid non-admins to list info fields", async () => {
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
});
