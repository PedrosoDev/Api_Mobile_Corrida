import { Request, Response } from "express";
import createRunner from "../services/runner/create.runner";
import findByIdRace from "../services/race/findById.race";
import { instanceToPlain } from "class-transformer";

export default class RunnerController {
  public async createRunner(req: Request, res: Response): Promise<Response> {
    const runner = await createRunner(req.body);

    const json = instanceToPlain(runner);
    return res.status(201).send(json);
  }
}
