import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import createUser from "../services/user/create.user";

export default class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const user = await createUser(req.body);

    const json = instanceToPlain(user);
    return res.status(201).send(json);
  }
}
