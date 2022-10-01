import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Challenge from "./Challenge.model";

/**
 * Answer
 * @typedef {object} Answer
 * @property {string} name.required;
 * @property {boolean} isCorrect.required;
 * @property {Challenge} challenge.required;
 */
@Entity()
export default class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  isCorrect!: boolean;

  @ManyToOne(() => Challenge, { nullable: false })
  challenge!: Challenge;
}
