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
export class AssetWithdrawalType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(type => InfoField)
  @JoinTable()
  public fields: InfoField[];
}
