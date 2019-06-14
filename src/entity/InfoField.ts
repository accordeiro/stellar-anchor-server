import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"])
export class InfoField {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public optional: boolean;

  @Column("simple-array")
  public choices: string[];

  constructor(
    name: string,
    description: string,
    optional: boolean = true,
    choices: string[] = [],
  ) {
    this.name = name;
    this.description = description;
    this.optional = optional;
    this.choices = choices;
  }
}
