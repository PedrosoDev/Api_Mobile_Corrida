import ChallengeController from "../controllers/Challenge.controller";
import express from "express";
import Answer from "../models/Answers.model";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import validateBody from "../middleware/validateBody";
import ChallengeDto from "../dto/challenge.dto";

const challengeController = new ChallengeController();

export default express
  .Router()

  /**
   * POST /challenges/{RaceCode}/
   * @summary Create a challenge to a race
   * @tags Challenge
   * @security BearerAuth
   * @param {string} RaceCode.path.required
   * @param {object} request.body.required
   * @return {Runner} 201 - successs response
   * @example request - example
   * {
   *  "question": "Texto da pergunta",
   *  "imageName": "Image test"
   *  "challengeType": "Question",
   *  "answers": [
   *    {
   *      "name": "Respota 1",
   *      "isCorrect": true
   *    },
   *    {
   *      "name": "Respota 2",
   *      "isCorrect": false
   *    },
   *    {
   *      "name": "Respota 3",
   *      "isCorrect": false
   *    },
   *    {
   *      "name": "Respota 4",
   *      "isCorrect": false
   *    }
   *  ]
   * }
   */
  .post(
    "/:raceCode/",
    [validateBody(ChallengeDto), ensureAuthenticated],
    challengeController.createChallenge
  );
