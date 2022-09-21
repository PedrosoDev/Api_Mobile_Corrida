import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ChallengeType from "./ChallengeType.model";

/**
 * Challenge
 * @typedef {object} Challenge
 * @property {string} question.required
 * @property {ChallengeType} challengeType.required
 */
@Entity()
export default class Challenge {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    question!: string;

    @ManyToOne(() => ChallengeType, { nullable: false })
    challengeType!: ChallengeType;
}