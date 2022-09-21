import express from "express";
import AppDataSource from "../AppDataSource";
import User from "../models/User.model";
import { jsonError } from "../utils/utils";

const repository = AppDataSource.getRepository(User);

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
  .post("/", async (req, res) => {
    // TODO: Criptografar a senha do usuário.

    const user = await repository.create(req.body);
    const result = await repository.save(user);
    return res.status(201).json(result);
  })

  /**
   * GET /users/
   * @summary Return a list of users
   * @tags User
   * @return {array<User>} 200 - sucess response
   */
  .get("/", async (req, res) => res.json(await repository.find()))

  /**
   * GET /users/{id}/
   * @summary Return a specific user
   * @tags User
   * @param {number} id.path - user id
   * @return {User} 200 - sucess response
   * @return {Error} 404 - not found response
   */
  .get("/:id/", async (req, res) => {
    const id = Number(req.params.id);
    const user = await repository.findOneBy({ id });

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    return res.json(user);
  })

  /**
   * PUT /users/{id}/
   * @summary Update a specific user
   * @tags User
   * @param {number} id.path - user id
   * @param {object} request.body.required
   * @return {User} 200 - sucess response
   * @return {Error} 404 - not found response
   * @example request - example
   * {
   *  "name": "John Doe Update",
   *  "email": "email@test.com",
   *  "password": "test1234"
   * }
   */
  .put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const user = await repository.findOneBy({ id });

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    repository.merge(user, req.body);
    const results = await repository.save(user);

    return res.json(results);
  })

  /**
   * DELETE /users/{id}/
   * @summary Delete a specific user
   * @tags User
   * @param {number} id.path - user id
   * @return {object} 204 - sucess response
   * @return {Error} 404 - not found response
   */
  .delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const user = await repository.findOneBy({ id });

    if (!user) {
      return jsonError(res, { statusCode: 404, message: "User not found" });
    }

    repository.delete({ id });

    return res.status(204).json();
  });
