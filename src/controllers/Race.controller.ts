import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import {
  jsonError,
  getUserFromToken,
  generateRandomCode,
} from "../utils/utils";
import createRace from "../services/race/create.race";
import findByCode from "../services/race/findByCode.race";
import findAllFromUser from "../services/race/findAllFromUser.race";
import findById from "../services/race/findById.race";

export default class RaceController {
  // TODO: Adicionar a forma de criação da corrida com os checkpoints
  public async createRace(req: Request, res: Response): Promise<Response> {
    const user = await getUserFromToken(req);

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    req.body.host = user;

    let code = "";
    do {
      code = generateRandomCode(6);
    } while (await findByCode(code));

    req.body.code = code;

    const race = await createRace(req.body);
    const json = instanceToPlain(race);
    return res.status(201).send(json);
  }

  public async getAllRaces(req: Request, res: Response): Promise<Response> {
    const user = await getUserFromToken(req);

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    const json = instanceToPlain(await findAllFromUser(user));
    return res.status(200).send(json);
  }

  public async getRaceFromCode(req: Request, res: Response): Promise<Response> {
    const raceCode = req.query.code;

    const race = await findByCode(raceCode as string);

    if (!race) {
      return jsonError(res, { statusCode: 404, message: "Race not found" });
    }

    const json = instanceToPlain(race);
    return res.status(200).send(json);
  }

  public async getRaceFromId(req: Request, res: Response): Promise<Response> {
    const raceId = req.params.id;

    if (Number.isNaN(raceId)) {
      return jsonError(res, {
        statusCode: 400,
        message: "The id parameter must be a number",
      });
    }

    const race = await findById(Number.parseInt(raceId));

    if (!race) {
      return jsonError(res, { statusCode: 404, message: "Race not found" });
    }

    const json = instanceToPlain(race);
    return res.status(200).send(json);
  }
}
