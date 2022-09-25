import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import Race from "./Race.model";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: false })
  @MinLength(8)
  @Exclude()
  password!: string;

  @OneToMany(() => Race, (race) => race.host)
  races!: Race[];
}
