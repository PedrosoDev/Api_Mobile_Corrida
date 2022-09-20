import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Race from "./Race.model";

/**
 * Runner
 * @typedef {object} Runner
 * @property {string} name.required
 * @property {Date} raceTimeStarted
 * @property {Date} raceTimeFinished
 * @property {Race} race.required
 */
@Entity()
export default class Runner {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ type: "timestamp", nullable: true })
    raceTimeStarted!: Date | null;

    @Column({ type: "timestamp", nullable: true })
    raceTimeFinished!: Date | null;

    @ManyToOne(() => Race, (race) => race.runners, { nullable: false })
    race!: Race;
}