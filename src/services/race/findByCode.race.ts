import AppDataSource from "../../AppDataSource";
import Race from "../../models/Race.model";

const repository = AppDataSource.getRepository(Race);

export default async function (code: string): Promise<Race | null> {
  return await repository.findOne({
    relations: { runners: true },
    where: {
      code,
    },
  });
}
