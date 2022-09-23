import { Request, Response } from "express";
import createRunner from "../services/runner/create.runner";
import raceFindByCode from "../services/race/findByCode.race";
import findFromRace from "../services/runner/findFromRace.runner";
import { instanceToPlain } from "class-transformer";
import { jsonError } from "../utils/utils";
import Runner from "../models/Runner.model";

export default class RunnerController {
  // TODO: Verificar se ja existe um corridor com o mesmo nome.
  public async createRunner(req: Request, res: Response): Promise<Response> {
    const raceCode = req.params.raceCode;
    const race = await raceFindByCode(raceCode);

    if (!race) {
      return jsonError(res, { statusCode: 404, message: "Race not found" });
    }

    const runnerName = req.body.name as string;

    const existRunner = await findFromRace({ runnerName, race });

    if (existRunner) {
      return jsonError(res, {
        statusCode: 400,
        message: "There is already a runner with this name",
      });
    }

    const runner: Runner = req.body;
    runner.race = race;
    const result = await createRunner(runner);

    const json = instanceToPlain(result);
    return res.status(201).send(json);
  }
}
