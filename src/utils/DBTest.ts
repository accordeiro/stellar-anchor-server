import { validate } from "class-validator";
import { Connection, getRepository } from "typeorm";
import { Role, User } from "../entity/User";
import { JWTService } from "../services/JWTService";

interface DBEntity {
  name: string;
  tableName: string;
}

export class DBTest {
  private connection: Connection;

  constructor(connection: Connection) {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("DBTest only allowed in test environment");
    }
    this.connection = connection;
  }

  public async createAdminUser() {
    const user = new User("admin", Role.Admin);
    user.setPassword("admin");

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error("Could not create user");
    }

    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async getAdminJWT(): Promise<string> {
    const userRepository = getRepository(User);
    const adminUsers = await userRepository.find({
      take: 1,
      where: {
        username: "admin",
      },
    });

    if (adminUsers.length < 1) {
      throw new Error("Could not find any admin users");
    }

    return JWTService.signJWT(adminUsers[0]).token;
  }

  public async cleanUp() {
    const entities = await this.getAllEntities();
    try {
      for (const entity of entities) {
        const repo = await getRepository(entity.name);
        await repo.query(`DELETE FROM ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  private async getAllEntities(): Promise<DBEntity[]> {
    const entitityMetadatas = await this.connection.entityMetadatas;
    return entitityMetadatas.map(x => {
      return {
        name: x.name,
        tableName: x.tableName,
      };
    });
  }
}
