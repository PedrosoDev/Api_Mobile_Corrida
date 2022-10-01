import express from "express";
import TokenController from "../controllers/Token.controller";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import validateBody from "../middleware/validateBody";
import LoginDto from "../dto/login.dto";

const tokenController = new TokenController();

/**
 * RefreshToken
 * @typedef {object} RefreshToken
 * @property {string} refreshToken.required
 */

/**
 * Token
 * @typedef {object} Token
 * @property {string} accessToken.required
 * @property {string} refreshToken.required
 */
export default express
  .Router()
  /**
   * POST /token/
   * @summary Login a user
   * @tags Token
   * @param {object} request.body.required
   * @return {Token} 200 - success response
   * @return {Error} 404 - bad response
   * @example request - example
   * {
   *    "email": "email@test.com",
   *    "password": "test1234"
   * }
   */
  .post("/", validateBody(LoginDto), tokenController.getTokenWithLogin)

  /**
   * POST /token/refresh/
   * @summary Refresh access token
   * @tags Token
   * @security BearerAuth
   * @param {object} request.body.required
   * @return {Token} 200 - success response
   * @return {Error} 404 - bad response
   * @example request - example
   * {
   *    "refresh": "",
   * }
   */
  .post("/refresh/", ensureAuthenticated, tokenController.getTokenWithLogin);

//TODO: Crair uma rota onde o usuário pode se deslogar, assim removendo da base de dados o token infinito
