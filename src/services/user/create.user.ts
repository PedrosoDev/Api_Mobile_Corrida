import AppDataSource from "../../AppDataSource";
import User from "../../models/User.model";
import bcrypt from "bcrypt";

const repository = AppDataSource.getRepository(User);

interface Props {
  name: string;
  email: string;
  password: string;
}

export default async function (props: Props): Promise<User> {
  props.password = await bcrypt.hash(props.password, 10);
  const user = await repository.create(props);
  return await repository.save(user);
}
