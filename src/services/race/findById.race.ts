import AppDataSource from "../../AppDataSource";
import Race from "../../models/Race.model";

const repository = AppDataSource.getRepository(Race);

export default async function (id: number): Promise<Race | null> {
  return await repository.findOneBy({ id });
}
