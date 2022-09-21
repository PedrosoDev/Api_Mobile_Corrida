import express from "express";
import TokenController from "../controllers/Token.controller";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
const tokenController = new TokenController();

/**
 * Login
 * @typedef {object} Login
 * @property {string} email.required
 * @property {string} password.required
 */

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
  .post("/", async (req, res) => tokenController.getTokenWithLogin(req, res))

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
  .post("/refresh/", ensureAuthenticated, async (req, res) =>
    tokenController.getTokenWithLogin(req, res)
  );
