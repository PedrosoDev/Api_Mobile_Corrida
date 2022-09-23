import { Request, Response } from "express";
import findByEmail from "../services/user/findByEmail.user";
import { getUserFromToken, jsonError } from "../utils/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { instanceToPlain } from "class-transformer";

const SECRET_KEY_TOKEN = "329cf7e1-20b2-4e13-8e03-79c06fe1f10c";
const SECRET_KEY_REFRESHTOKEN = "449d231c-2746-44fb-9ac7-4cd83cfbc057";

export default class TokenController {
  public async getTokenWithLogin(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { email, password } = req.body;

    const user = await findByEmail(email);

    if (!user) {
      return jsonError(res, {
        statusCode: 401,
        message: "Authentication failed",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return jsonError(res, {
        statusCode: 401,
        message: "Authentication failed",
      });
    }

    const json = instanceToPlain(this.generateTokens(user));
    return res.status(200).send(json);
  }

  public async getTokenWithRefreshToken(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { refreshToken } = req.body;
    const user = await getUserFromToken(req);

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    try {
      jwt.verify(refreshToken, SECRET_KEY_REFRESHTOKEN);
      const json = instanceToPlain(this.generateTokens(user));
      return res.status(200).send(json);
    } catch (error) {
      return jsonError(res, {
        statusCode: 401,
        message: "Invalid resfresh token",
      });
    }
  }

  generateTokens(user: User) {
    const accessToken = jwt.sign({}, SECRET_KEY_TOKEN, {
      subject: user.id.toString(),
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign({}, SECRET_KEY_REFRESHTOKEN, {
      subject: user.id.toString(),
      expiresIn: "10 days",
    });

    return { accessToken, refreshToken };
  }
}
