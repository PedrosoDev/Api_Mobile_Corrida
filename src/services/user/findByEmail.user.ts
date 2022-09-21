import AppDataSource from "../../AppDataSource";
import User from "../../models/User.model";

const repository = AppDataSource.getRepository(User);

export default async function (email: string): Promise<User | null> {
  return await repository.findOneBy({ email });
}
