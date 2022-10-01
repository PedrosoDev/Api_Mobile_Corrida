import RunnerController from "../controllers/Runner.controller";
import express from "express";

const runnerController = new RunnerController();

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
