import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"])
export class InfoField {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNotEmpty()
  public description: string;

  @Column({ default: false })
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
