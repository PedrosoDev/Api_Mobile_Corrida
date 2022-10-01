import { FindManyOptions, FindOptionsWhere } from "typeorm";
import AppDataSource from "../../AppDataSource";
import RaceDto from "../../dto/race.dto";
import UserDto from "../../dto/user.dto";
import Race from "../../models/Race.model";
import User from "../../models/User.model";

const repository = AppDataSource.getRepository(Race);

export default async function (user: User): Promise<Race[]> {
  return await repository.find({
    where: {
      host: {
        id: user.id,
      },
    },
  });
}
