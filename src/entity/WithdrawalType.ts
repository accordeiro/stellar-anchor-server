import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { InfoField } from "./InfoField";

@Entity()
@Unique(["name"])
export class WithdrawalType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @ManyToMany(type => InfoField)
  @JoinTable()
  public infoFields: InfoField[];

  constructor(name: string) {
    this.name = name;
  }
}
