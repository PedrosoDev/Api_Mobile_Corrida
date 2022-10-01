import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import RaceModel from "../models/Race.model";
import User from "../models/User.model";

export default class UserDto extends User {
  @Exclude({ toClassOnly: true })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Exclude()
  isVerified!: boolean;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password!: string;

  @Exclude({ toClassOnly: true })
  races!: RaceModel[];
}
