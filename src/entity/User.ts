import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

export enum Role {
  Admin = "admin",
  Regular = "regular",
}

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Length(4, 20)
  public username: string;

  @Column()
  @IsNotEmpty()
  public role: Role;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  @Length(4, 100)
  private password: string;

  constructor(username: string, role: Role) {
    this.username = username;
    this.role = role;
  }

  public setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 8);
  }

  public isPasswordValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
