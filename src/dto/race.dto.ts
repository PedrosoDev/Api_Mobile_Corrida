import { Exclude } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import Race from "../models/Race.model";
import UserDto from "./user.dto";
import RunnerDto from "./runner.dto";
import CheckpointDto from "./checkpoint.dto";
import ChallengeModel from "../models/Challenge.model";
import ChallengeDto from "./challenge.dto";

export default class RaceDto extends Race {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @Exclude({ toClassOnly: true })
  code!: string;

  @Exclude({ toClassOnly: true })
  host!: UserDto;

  @Exclude({ toClassOnly: true })
  runners!: RunnerDto[];

  @ValidateNested({ each: true })
  checkpoints!: CheckpointDto[];

  @ValidateNested({ each: true })
  challenges!: ChallengeDto[];
}
