import AppDataSource from "../../AppDataSource";
import UserDto from "../../dto/user.dto";
import User from "../../models/User.model";

const repository = AppDataSource.getRepository(User);

export default async function (id: number): Promise<User | null> {
  return await repository.findOneBy({ id });
}
