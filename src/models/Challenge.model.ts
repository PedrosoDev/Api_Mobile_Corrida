import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Answer from "./Answers.model";
import { ChallengeType } from "../enums/ChallengeType.enum";
import Race from "./Race.model";

@Entity()
export default class Challenge {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  question!: string;

  @OneToMany(() => Answer, (answer) => answer.challenge)
  answers!: Answer[];

  @Column({ type: "enum", enum: ChallengeType })
  challengeType!: ChallengeType;

  @ManyToOne(() => Race, { nullable: false })
  race!: Race;
}
