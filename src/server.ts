import "reflect-metadata";
import AppDataSouce from "./AppDataSource";
import swaggerSpecs from "./swagger";
import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import expressJSDocSwagger from "express-jsdoc-swagger";

const { PORT = 3000 } = process.env;

void (async function () {
  await AppDataSouce.initialize();
  const app = express();

  app.use(cors());

  app.use(express.json());

  expressJSDocSwagger(app)(swaggerSpecs);

  app.use("/v1", routes);

  app.listen(PORT, () => console.log(`⚡ server is running on ${PORT}`));
})();
