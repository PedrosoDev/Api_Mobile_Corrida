import AppDataSource from "../../AppDataSource";
import RaceDto from "../../dto/race.dto";
import Race from "../../models/Race.model";

const repository = AppDataSource.getRepository(Race);

export default async function (code: string): Promise<Race | null> {
  return await repository.findOne({
    relations: { runners: true, host: true },
    where: {
      code,
    },
  });
}
