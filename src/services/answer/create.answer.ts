import Answer from "../../models/Answers.model";
import AppDataSource from "../../AppDataSource";
import Challenge from "../../models/Challenge.model";

interface Props {
  name: string;
  isCorrect: boolean;
  challenge: Challenge;
}

const repository = AppDataSource.getRepository(Answer);

export default async function (props: Props): Promise<Answer> {
  const answer = repository.create(props);
  return await repository.save(answer);
}
