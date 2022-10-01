import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { generateRandomCode } from "../utils/utils";
import ResponseError from "../errors/error";
import createRace from "../services/race/create.race";
import findByCodeRace from "../services/race/findByCode.race";
import findAllFromUser from "../services/race/findAllFromUser.race";
import findByIdRace from "../services/race/findById.race";

export default class RaceController {
  // TODO: Adicionar a forma de criação da corrida com os checkpoints
  public async createRace(req: Request, res: Response): Promise<Response> {
    const user = req.currentUser!;
    const data = req.body;

    data.host = user;

    let code = "";
    do {
      code = generateRandomCode(6);
    } while (await findByCodeRace(code));

    data.code = code;

    const race = await createRace(data);
    const json = instanceToPlain(race);
    return res.status(201).send(json);
  }

  public async getAllRaces(req: Request, res: Response): Promise<Response> {
    const user = req.currentUser!;

    const json = instanceToPlain(await findAllFromUser(user));
    return res.status(200).send(json);
  }

  public async getRaceFromCode(req: Request, res: Response): Promise<Response> {
    const raceCode = req.params.raceCode;

    const race = await findByCodeRace(raceCode);

    if (!race) {
      throw new ResponseError(404, "Race not found");
    }

    const json = instanceToPlain(race);
    return res.status(200).send(json);
  }

  public async getRaceFromId(req: Request, res: Response): Promise<Response> {
    const raceId = req.params.id;

    if (Number.isNaN(raceId)) {
      throw new ResponseError(400, "The id parameter must be a number");
    }

    const race = await findByIdRace(Number.parseInt(raceId));

    if (!race) {
      throw new ResponseError(404, "Race not found");
    }

    const json = instanceToPlain(race);
    return res.status(200).send(json);
  }
}
