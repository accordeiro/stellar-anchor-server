import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import { Connection, createConnection } from "typeorm";
import app from "../app";
import { DBTest } from "../utils/DBTest";

chai.use(chaiHttp);
let dbTest: DBTest;
let conn: Connection;

describe("Authentication APIs", () => {
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

  it("Should return token on login", async () => {
    return chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "admin",
        password: "admin",
      })
      .then(res => {
        chai.expect(res).to.be.json;
        chai.expect(res).to.have.status(200);
        const respJSON = JSON.parse(res.text);
        chai.expect(respJSON.token).to.be.string;
      });
  });

  it("Should not allow wrong passwords", async () => {
    return chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "admin",
        password: "nimda",
      })
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should not allow login from users that do not exist", async () => {
    return chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "nimda",
        password: "whatever",
      })
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should allow users to change their passwords", async () => {
    const token = await dbTest.getAdminJWT();

    return chai
      .request(app)
      .post("/api/v1/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "admin",
        newPassword: "administrator",
      })
      .then(res => {
        chai.expect(res).to.have.status(204);
      });
  });

  it("Should block password change if oldPassword is wrong", async () => {
    const token = await dbTest.getAdminJWT();

    return chai
      .request(app)
      .post("/api/v1/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "notadmin",
        newPassword: "somethingelse",
      })
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should return a 401 for unauthenticated requests", async () => {
    return chai
      .request(app)
      .post("/api/v1/auth/change-password")
      .send({
        oldPassword: "admin",
        newPassword: "somethingelse",
      })
      .then(res => {
        chai.expect(res).to.have.status(401);
      });
  });

  it("Should require both old and new passwords", async () => {
    const token = await dbTest.getAdminJWT();

    return chai
      .request(app)
      .post("/api/v1/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        newPassword: "somethingelse",
      })
      .then(res => {
        chai.expect(res).to.have.status(400);
      });
  });
});
