import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import createUser from "../services/user/create.user";
import findByEmail from "../services/user/findByEmail.user";
import ResponseError from "../errors/error";

export default class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const existEmail = await findByEmail(req.body.email);

    if (existEmail) {
      throw new ResponseError(400, "There is already a user with this email");
    }

    const user = await createUser(req.body);

    const json = instanceToPlain(user);
    return res.status(201).send(json);
  }
}
