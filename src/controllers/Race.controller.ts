import { create } from "domain";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import {
  jsonError,
  getUserToken,
  getUserFromToken,
  generateRandomCode,
} from "../utils/utils";
import createRace from "../services/race/create.race";
import findByCode from "../services/race/findByCode.race";
import findAllFromUser from "../services/race/findAllFromUser.race";
import Race from "../models/Race.model";
import { ParsedQs } from "qs";

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
    const race = await findByCode(req.params.code);

    if (!race) {
      return jsonError(res, { statusCode: 404, message: "Race not found" });
    }

    const json = instanceToPlain(race);
    return res.status(200).send(json);
  }
}
