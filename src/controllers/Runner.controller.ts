import { Request, Response } from "express";
import createRunner from "../services/runner/create.runner";
import raceFindByCodeRace from "../services/race/findByCode.race";
import findRunnerFromRace from "../services/runner/findRunnerFromRace.runner";
import { instanceToPlain } from "class-transformer";
import Runner from "../models/Runner.model";
import ResponseError from "../errors/error";

export default class RunnerController {
  // TODO: Verificar se ja existe um corridor com o mesmo nome.
  public async createRunner(req: Request, res: Response): Promise<Response> {
    const raceCode = req.params.raceCode;
    const race = await raceFindByCodeRace(raceCode);

    if (!race) {
      throw new ResponseError(404, "Race not found");
    }

    const runnerName = req.body.name as string;

    const existRunner = await findRunnerFromRace({ runnerName, race });

    if (existRunner) {
      throw new ResponseError(400, "There is already a runner with this name");
    }

    const runner: Runner = req.body;
    runner.race = race;
    const result = await createRunner(runner);

    const json = instanceToPlain(result);
    return res.status(201).send(json);
  }
}
