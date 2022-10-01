import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeType } from "../enums/ChallengeType.enum";
import Race from "./Race.model";

@Entity()
export default class Checkpoint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  code!: string;

  @Column({ type: "enum", enum: ChallengeType })
  challengeType!: ChallengeType;

  @ManyToOne(() => Race, { nullable: false })
  race!: Race;
}
