import { ChallengeType } from "../enums/ChallengeType.enum";
import AnswerDto from "./answer.dto";
import RaceDto from "./race.dto";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Exclude } from "class-transformer";
import Challenge from "../models/Challenge.model";

/**
 * Challenge
 * @typedef {object} Challenge
 * @property {string} quetion.required
 * @property {string} imageName.required
 * @property {string} challeneType.required - enum:Question
 * @property {array<Answer>} answers.required
 */
export default class ChallengeDto extends Challenge {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  question!: string;

  @IsString()
  @IsNotEmpty()
  imageName!: string;

  @ValidateNested({
    each: true,
  })
  answers!: AnswerDto[];

  @IsEnum(ChallengeType)
  challengeType!: ChallengeType;

  @Exclude({ toClassOnly: true })
  race!: RaceDto;
}
