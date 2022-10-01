import { Exclude } from "class-transformer";
import { IsDate, IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";
import RaceModel from "../models/Race.model";
import Runner from "../models/Runner.model";
import RaceDto from "./race.dto";

/**
 * Runner
 * @typedef {object} Runner
 * @property {string} name.required
 * @property {Date} raceTimeStarted
 * @property {Date} raceTimeFinished
 * @property {Race} race.required
 */
export default class RunnerDto extends Runner {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name!: string;

  @IsDate()
  @IsEmpty()
  raceTimeStarted!: Date | null;

  @IsDate()
  @IsEmpty()
  raceTimeFinished!: Date | null;

  @Exclude({ toClassOnly: true })
  race!: RaceDto;
}
