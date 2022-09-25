import express from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import RaceController from "../controllers/Race.controller";

const raceController = new RaceController();

/**
 * Race
 * @typedef {object} Race
 * @property {string} name.required
 * @property {string} code
 * @property {User} host
 */
export default express
  .Router()

  /**
   * POST /races/
   * @summary Create a race
   * @tags Race
   * @security BearerAuth
   * @param {object} request.body.required
   * @return {Race} 201 - success response
   * @example request - example without checkpoints
   * {
   *  "name": "Corrida IFC - IA20"
   * }
   * @example request - example with checkpoints
   * {
   *  "name": "Corrida IFC - IA20",
   *  "checkpoints": [
   *    {
   *      "name": "Ponto - LabMat(i)²",
   *      "challengeType": "Questionário"
   *    },
   *    {
   *      "name": "Ponto - Refeitorio",
   *      "challengeType": "Questionário"
   *    },
   *    {
   *      "name": "Ponto - Cantina",
   *      "challengeType": "Questionário"
   *    },
   *  ]
   * }
   */
  .post(
    "/",
    ensureAuthenticated,
    async (req, res) => await raceController.createRace(req, res)
  )

  /**
   * GET /races/
   * @summary Get list of user's races
   * @tags Race
   * @security BearerAuth
   * @return {array<Race>} 200 - success response
   */
  .get("/", ensureAuthenticated, raceController.getAllRaces)

  /**
   * GET /races/{RaceCode}/
   * @summary Get race from code
   * @tags Race
   * @param {string} code.query.required
   * @security BearerAuth
   * @return {Race} 200 - success response
   */
  .get("/:raceCode/", raceController.getRaceFromCode)

  /**
   * GET /races/{id}/
   * @summary Get race from id
   * @tags Race
   * @param {string} id.path - race's id
   * @return {Race} 200 - success response
   * @return {Error} 404 - bad response
   */
  .get("/:id/", raceController.getRaceFromId);
