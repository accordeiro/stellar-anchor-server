import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { InfoField } from "./InfoField";

@Entity()
export class AssetWithdrawalType {
  @PrimaryColumn()
  public name: string;

  @ManyToMany(type => InfoField)
  @JoinTable()
  public fields: InfoField[];
}
