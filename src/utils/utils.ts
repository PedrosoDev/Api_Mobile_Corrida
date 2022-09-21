import { Response } from "express";
import Error from "../errors/error";

export function jsonError(res: Response, error: Error) {
    return res.status(error.statusCode).json(error);
}