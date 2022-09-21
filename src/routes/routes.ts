import express from "express";
import userRoutes from "./user.routes";
import tokenRoutes from "./token.routes";

export default express
  .Router()

  .use("/users", userRoutes)
  .use("/token", tokenRoutes);
