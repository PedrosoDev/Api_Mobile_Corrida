import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Login
 * @typedef {object} Login
 * @property {string} email.required
 * @property {string} password.required
 */
export default class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
