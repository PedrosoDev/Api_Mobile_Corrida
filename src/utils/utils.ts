import { Request, Response } from "express";
import Error from "../errors/error";

export function jsonError(res: Response, error: Error) {
  return res.status(error.statusCode).json(error);
}

export function getUserToken(req: Request) {
  const authToken = req.headers.authorization!;

  const [, token] = authToken.split(" ");

  return token;
}
