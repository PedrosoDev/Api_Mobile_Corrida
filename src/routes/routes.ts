import express from "express";
import userRoutes from "./user.routes";
import raceRoutes from "./race.routes";
import runnerRoutes from "./runner.routes";
import challengeRoutes from "./challenge.routes";
import tokenRoutes from "./token.routes";

export default express
  .Router()

  .use("/users", userRoutes)
  .use("/races", raceRoutes)
  .use("/runners", runnerRoutes)
  .use("/challenges", challengeRoutes)
  .use("/token", tokenRoutes);
