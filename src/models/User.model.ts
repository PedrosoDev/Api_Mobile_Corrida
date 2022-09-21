import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Race from "./Race.model";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Race, (race) => race.host)
  races!: Race[];
}
