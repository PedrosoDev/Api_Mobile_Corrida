import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Runner from "./Runner.model";
import User from "./User.model";

/**
 * Race
 * @typedef {object} Race
 * @property {string} name.required
 * @property {string} code.required
 * @property {User} host.required
 */
@Entity()
export default class Race {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    code!: string;

    @ManyToOne(() => User, (user) => user.races, { nullable: false })
    host!: User;

    @OneToMany(() => Runner, (runner) => runner.race, { nullable: false })
    runners!: Runner[];
}