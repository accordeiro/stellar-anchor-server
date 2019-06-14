import { Length } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { AssetWithdrawalType } from "./AssetWithdrawalType";
import { InfoField } from "./InfoField";

@Entity()
export class Asset {
  @PrimaryColumn()
  @Length(4, 12)
  public name: string;

  // Deposit info:

  @Column()
  public depositEnabled: boolean;

  @Column("double")
  public depositFeeFixed: number;

  @Column("double")
  public depositFeePercent: number;

  @Column("double")
  public depositMinAmount: number;

  @Column("double")
  public depositMaxAmount: number;

  @ManyToMany(type => InfoField)
  @JoinTable()
  public depositInfoFields: InfoField[];

  // Withdrawal info:

  @Column()
  public withdrawalEnabled: boolean;

  @Column("double")
  public withdrawalFeeFixed: number;

  @Column("double")
  public withdrawalFeePercent: number;

  @Column("double")
  public withdrawalMinAmount: number;

  @Column("double")
  public withdrawalMaxAmount: number;

  @ManyToMany(type => AssetWithdrawalType)
  @JoinTable()
  public withdrawalTypes: AssetWithdrawalType[];
}
