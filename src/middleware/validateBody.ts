import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import ResponseError from "../errors/error";

type ClassType<T> = {
  new (...args: any[]): T;
};

export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export default function validateBody<T>(targetClass: ClassType<T>) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const erros = await validate(req.body, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (erros.length > 0) {
      throw new ResponseError(
        400,
        "Ocorreu um erro na validação do corpo da requisição!"
      );
    }

    req.body = plainToInstance(targetClass, req.body);
    next();
  };
}
