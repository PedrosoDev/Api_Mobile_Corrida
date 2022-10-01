import Race from "../../models/Race.model";
import AppDataSource from "../../AppDataSource";
import Runner from "../../models/Runner.model";
import RunnerDto from "../../dto/runner.dto";
import RaceDto from "../../dto/race.dto";

interface Props {
  race: Race;
  runnerName: string;
}

const repository = AppDataSource.getRepository(Runner);

export default async function ({
  race,
  runnerName,
}: Props): Promise<Runner | null> {
  return await repository.findOne({
    relations: {
      race: true,
    },
    where: {
      name: runnerName,
      race: {
        id: race.id,
      },
    },
  });
}
