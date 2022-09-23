import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Race from "./Race.model";

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
