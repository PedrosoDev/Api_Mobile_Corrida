import ChallengeController from "../controllers/Challenge.controller";
import express from "express";
import Answer from "../models/Answers.model";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const challengeController = new ChallengeController();

/**
 * Challenge
 * @typedef {object} Challenge
 * @property {string} quetion.required
 * @property {string} challeneType.required - enum:Question
 * @property {array<Answer>} answers.required
 * @property {Race} race.required
 */
export default express
  .Router()

  /**
   * POST /challenges/{RaceCode}/
   * @summary Create a challene to a race
   * @tags Challenge
   * @security BearerAuth
   * @param {string} RaceCode.path.required
   * @param {object} request.body.required
   * @return {Runner} 201 - successs response
   * @example request - example
   * {
   *  "question": "Texto da pergunta",
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
    ensureAuthenticated,
    challengeController.createChallenge
  );
