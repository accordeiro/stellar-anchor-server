import { config } from "dotenv";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Role, User } from "../entity/User";

config();
const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "admin";

export class CreateAdminUser1560540479234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User("admin", Role.Admin);
    user.setPassword(adminPassword);
    const userRepo = getRepository(User);
    await userRepo.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
