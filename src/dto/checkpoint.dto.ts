import { Exclude } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ChallengeType } from "../enums/ChallengeType.enum";
import Checkpoint from "../models/Checkpoint.model";

/**
 * Checkpoint
 * @typedef {object} Checkpoint
 * @property {string} name.required
 * @property {string} code.required
 * @property {ChallengeType} challengeType.required
 */
export default class CheckpointDto extends Checkpoint {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @Exclude({ toClassOnly: true })
  code!: string;

  @IsEnum(ChallengeType)
  challengeType!: ChallengeType;

  @Exclude({ toClassOnly: true })
  race!: RaceDto;
}
