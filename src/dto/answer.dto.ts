import { Exclude } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import Answer from "../models/Answers.model";
import ChallengeModel from "../models/Challenge.model";

export default class AnswerDto extends Answer {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  isCorrect!: boolean;

  @Exclude({ toClassOnly: true })
  challenge!: ChallengeModel;
}
