import { NextFunction, Request, Response } from "express";
import { jsonError } from "../utils/utils";
import jwt from "jsonwebtoken";

const SECRET_KEY = "329cf7e1-20b2-4e13-8e03-79c06fe1f10c";

export default function (req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return jsonError(res, { statusCode: 401, message: "Token is missing" });
  }

  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, SECRET_KEY);

    return next();
  } catch (error) {
    return jsonError(res, { statusCode: 401, message: "Invalid token" });
  }
}
