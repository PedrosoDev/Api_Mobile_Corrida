import { NextFunction, Request, Response } from "express";
import ResponseError from "../errors/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import findByIdUser from "../services/user/findById.user";
import User from "../models/User.model";

const SECRET_KEY = "329cf7e1-20b2-4e13-8e03-79c06fe1f10c";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new ResponseError(401, "Token is missing");
  }

  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, SECRET_KEY);
    const { sub } = jwt.decode(token) as JwtPayload;

    req.currentUser = (await findByIdUser(Number.parseInt(sub!))) ?? undefined;

    return next();
  } catch (error) {
    throw new ResponseError(401, "Invalid token");
  }
}
