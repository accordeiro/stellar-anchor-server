import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class InfoField {
  @PrimaryColumn()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public optional: boolean;

  @Column("simple-array")
  public choices: string[];
}
