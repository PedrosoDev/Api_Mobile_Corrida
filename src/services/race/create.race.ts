import Runner from "../../models/Runner.model";
import User from "../../models/User.model";
import AppDataSource from "../../AppDataSource";
import Race from "../../models/Race.model";
import RaceDto from "../../dto/race.dto";

interface Props {
  name: string;
  code: string;
  host: User;
  runners: Runner[];
}

const repository = AppDataSource.getRepository(Race);

export default async function (props: Props): Promise<Race> {
  const race = repository.create(props);
  return await repository.save(race);
}
