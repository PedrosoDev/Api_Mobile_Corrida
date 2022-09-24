import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Challenge from "./Challenge.model";
import Checkpoint from "./Checkpoint.model";
import Runner from "./Runner.model";
import User from "./User.model";

@Entity()
export default class Race {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  code!: string;

  @ManyToOne(() => User, { nullable: false })
  host!: User;

  @OneToMany(() => Runner, (runner) => runner.race, { nullable: false })
  runners!: Runner[];

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.race)
  checkpoints!: Checkpoint[];

  @OneToMany(() => Challenge, (challenge) => challenge.race)
  challenges!: Challenge[];
}
