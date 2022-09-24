import Answer from "../../models/Answers.model";
import { ChallengeType } from "../../enums/ChallengeType.enum";
import AppDataSource from "../../AppDataSource";
import Challenge from "../../models/Challenge.model";

interface Props {
  question: string;
  answers: Answer[];
  challengeType: ChallengeType;
}

const repository = AppDataSource.getRepository(Challenge);

export default async function (props: Props): Promise<Challenge> {
  const challenge = repository.create(props);
  return await repository.save(challenge);
}
