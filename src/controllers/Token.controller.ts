import { Request, response, Response } from "express";
import findByEmail from "../services/user/findByEmail.user";
import { getUserToken, jsonError } from "../utils/utils";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.model";
import AppDataSource from "../AppDataSource";

const SECRET_KEY_TOKEN = "329cf7e1-20b2-4e13-8e03-79c06fe1f10c";
const SECRET_KEY_REFRESHTOKEN = "449d231c-2746-44fb-9ac7-4cd83cfbc057";

const repository = AppDataSource.getRepository(User);

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

    return res.status(200).json(this.generateTokens(user));
  }

  public async getTokenWithRefreshToken(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { refreshToken } = req.body;
    const token = getUserToken(req);
    const { sub } = jwt.decode(token) as JwtPayload;

    const user = await repository.findOneBy({ id: Number(sub!) });

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    try {
      jwt.verify(refreshToken, SECRET_KEY_REFRESHTOKEN);
      return res.status(200).json(this.generateTokens(user));
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
