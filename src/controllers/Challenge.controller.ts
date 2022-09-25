import { Request, Response } from "express";
import { getUserAuth } from "../utils/utils";
import { instanceToPlain } from "class-transformer";
import ResponseError from "../errors/error";
import Answer from "../models/Answers.model";
import createChallenge from "../services/challenge/create.challenge";
import createAnswer from "../services/answer/create.answer";
import findByCodeRace from "../services/race/findByCode.race";
import findByIdChallenge from "../services/challenge/findById.challenge";
import Challenge from "../models/Challenge.model";

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

    const { answers, ...challengeData } = req.body;

    challengeData.race = race.id;

    const challenge = await createChallenge(challengeData);

    for (let answer of answers) {
      answer.challenge = challenge;
      await createAnswer(answer);
    }

    const json = instanceToPlain(await findByIdChallenge(challenge.id));
    return res.status(201).send(json);
  }
}
