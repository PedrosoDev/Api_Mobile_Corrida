import "reflect-metadata";
import "express-async-errors";
import AppDataSouce from "./AppDataSource";
import swaggerSpecs from "./swagger";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import routes from "./routes/routes";
import expressJSDocSwagger from "express-jsdoc-swagger";
import ResponseError from "./errors/error";

const { PORT = 3000 } = process.env;

void (async function () {
  await AppDataSouce.initialize();
  const app = express();

  app.use(cors());

  app.use(express.json());

  expressJSDocSwagger(app)(swaggerSpecs);

  app.use("/v1", routes);

  app.use(((err, _req, res, next) => {
    if (err instanceof ResponseError) {
      res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message });
    } else if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }

    next(err);
  }) as ErrorRequestHandler);

  app.listen(PORT, () => console.log(`⚡ server is running on ${PORT}`));
})();
