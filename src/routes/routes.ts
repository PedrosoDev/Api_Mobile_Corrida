import express from "express";
import userRoutes from "./user.routes";
import raceRoutes from "./race.routes";
import runnerRoutes from "./runner.routes";
import tokenRoutes from "./token.routes";

export default express
  .Router()

  .use("/users", userRoutes)
  .use("/races", raceRoutes)
  .use("/runners", runnerRoutes)
  .use("/token", tokenRoutes);
