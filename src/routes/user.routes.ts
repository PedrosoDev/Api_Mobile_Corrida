import express from "express";
import UserController from "../controllers/User.controller";

const userController = new UserController();

/**
 * User
 * @typedef {object} User
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 */
export default express
  .Router()

  /**
   * POST /users/
   * @summary Create a user
   * @tags User
   * @param {object} request.body.required
   * @return {User} 201 - success response
   * @example request - example
   * {
   *  "name": "John Doe",
   *  "email": "email@test.com",
   *  "password": "test1234"
   * }
   */
  .post("/", userController.createUser);
