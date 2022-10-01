import AppDataSource from "../../AppDataSource";
import User from "../../models/User.model";
import bcrypt from "bcrypt";
import UserDto from "../../dto/user.dto";

interface Props {
  name: string;
  email: string;
  password: string;
}

const repository = AppDataSource.getRepository(User);

export default async function (props: Props): Promise<User> {
  props.password = await bcrypt.hash(props.password, 10);
  const user = await repository.create(props);
  return await repository.save(user);
}
