import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Race from "./Race.model";

/**
 * User
 * @typedef {object} User
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 */
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Race, (race) => race.host)
  races!: Race[];

}
