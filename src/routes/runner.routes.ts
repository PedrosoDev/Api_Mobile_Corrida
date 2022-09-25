import RunnerController from "../controllers/Runner.controller";
import express from "express";

const runnerController = new RunnerController();

/**
 * Runner
 * @typedef {object} Runner
 * @property {string} name.required
 * @property {Date} raceTimeStarted
 * @property {Date} raceTimeFinished
 * @property {Race} race.required
 */
export default express
  .Router()

  /**
   * POST /runners/{RaceCode}/
   * @summary Create a runner to a race
   * @tags Runner
   * @param {string} RaceCode.path.required
   * @param {object} request.body.required
   * @return {Runner} 201 - successs response
   * @example request - example
   * {
   *  "name": "John Doe"
   * }
   */
  .post("/:raceCode/", runnerController.createRunner);
