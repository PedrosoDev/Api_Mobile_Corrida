import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppDataSource from "../AppDataSource";
import Error from "../errors/error";
import User from "../models/User.model";

const repository = AppDataSource.getRepository(User);
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function jsonError(res: Response, error: Error): Response {
  return res.status(error.statusCode).json(error);
}

export function getUserToken(req: Request): string {
  const authToken = req.headers.authorization!;

  const [, token] = authToken.split(" ");

  return token;
}

export async function getUserFromToken(req: Request): Promise<User | null> {
  const token = getUserToken(req);
  const { sub } = jwt.decode(token) as JwtPayload;

  return await repository.findOneBy({ id: Number.parseInt(sub!) });
}

export function generateRandomCode(charAmount: number): string {
  let result = "";
  for (var i = 0; i < charAmount; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
