import AppDataSource from "../../AppDataSource";
import Challenge from "../../models/Challenge.model";

const repository = AppDataSource.getRepository(Challenge);

export default async function (id: number): Promise<Challenge | null> {
  return await repository.findOne({
    relations: {
      answers: true,
    },
    where: { id },
  });
}
