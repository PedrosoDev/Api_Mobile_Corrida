import { Request, Response } from "express";
import createUserService from "../services/user/create.user";

export default class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    // TODO: Criptografar a senha do usuário.
    const user = await createUserService(req.body);

    const { password, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  }
}
