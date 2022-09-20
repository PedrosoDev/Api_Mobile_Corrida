import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * ChallengeType
 * @typedef {object} ChallengeType
 * @property {string} name.required
 */
@Entity()
export default class ChallengeType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;
}