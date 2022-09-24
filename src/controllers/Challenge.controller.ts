import { Request, Response } from "express";
import findByCodeRace from "../services/race/findByCode.race";
import createChallenge from "../services/challenge/create.challenge";
import findByIdChallenge from "../services/challenge/findById.challenge";
import createAnswer from "../services/answer/create.answer";
import { getUserAuth } from "../utils/utils";
import ResponseError from "../errors/error";
import { instanceToPlain } from "class-transformer";
import Answer from "../models/Answers.model";

export default class ChallengeController {
  public async createChallenge(req: Request, res: Response): Promise<Response> {
    const user = await getUserAuth(req);
    const race = await findByCodeRace(req.params.raceCode);

    if (!race) {
      throw new ResponseError(404, "Race not found");
    }

    if (race.host.id != user.id) {
      throw new ResponseError(
        400,
        "It is not possible to change information for a race that you are not the host"
      );
    }

    req.body.race = race.id;
    req.body.code;
    const challenge = await createChallenge(req.body);

    const answers: Answer[] = req.body.answers;
    for (let answer of answers) {
      answer.challenge = challenge;
      await createAnswer(answer);
    }

    const json = instanceToPlain(await findByIdChallenge(challenge.id));
    return res.status(201).send(json);
  }
}
