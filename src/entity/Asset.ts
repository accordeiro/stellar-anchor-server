import { Length } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { InfoField } from "./InfoField";
import { WithdrawalType } from "./WithdrawalType";

@Entity()
@Unique(["name"])
export class Asset {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
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

  @ManyToMany(type => WithdrawalType)
  @JoinTable()
  public withdrawalTypes: WithdrawalType[];

  constructor(
    name: string,
    depositEnabled: boolean = false,
    depositFeeFixed: number = 0.1,
    depositFeePercent: number = 0.1,
    depositMinAmount: number = 0.1,
    depositMaxAmount: number = 0.1,
    withdrawalEnabled: boolean = false,
    withdrawalFeeFixed: number = 0.1,
    withdrawalFeePercent: number = 0.1,
    withdrawalMinAmount: number = 0.1,
    withdrawalMaxAmount: number = 0.1,
  ) {
    this.name = name;
    this.depositEnabled = depositEnabled;
    this.depositFeeFixed = depositFeeFixed;
    this.depositFeePercent = depositFeePercent;
    this.depositMinAmount = depositMinAmount;
    this.depositMaxAmount = depositMaxAmount;
    this.withdrawalEnabled = withdrawalEnabled;
    this.withdrawalFeeFixed = withdrawalFeeFixed;
    this.withdrawalFeePercent = withdrawalFeePercent;
    this.withdrawalMinAmount = withdrawalMinAmount;
    this.withdrawalMaxAmount = withdrawalMaxAmount;
  }
}
