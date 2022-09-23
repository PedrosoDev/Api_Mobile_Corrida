import Race from "../../models/Race.model";
import AppDateSource from "../../AppDataSource";
import Runner from "../../models/Runner.model";

interface Props {
  name: string;
  raceTimeStarted: Date | null;
  raceTimeFinished: Date | null;
  race: Race;
}

const repository = AppDateSource.getRepository(Runner);

export default async function (props: Props): Promise<Runner> {
  const race = repository.create(props);
  return await repository.save(race);
}
