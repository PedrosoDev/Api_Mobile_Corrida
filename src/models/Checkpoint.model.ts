import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ChallengeType from "./ChallengeType.model";
import Race from "./Race.model";

/**
 * Checkpoint
 * @typedef {object} Checkpoint
 * @property {string} name.required
 * @property {string} code.required
 * @property {ChallengeType} challengeType.required
 */
@Entity()
export default class Checkpoint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  code!: string;

  @ManyToOne(() => ChallengeType, { nullable: false })
  challengeType!: ChallengeType;

  @ManyToOne(() => Race, { nullable: false })
  race!: Race;
}
