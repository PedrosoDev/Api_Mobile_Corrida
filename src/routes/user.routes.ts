import express from "express";
import AppDataSource from "../AppDataSource";
import User from "../models/User.model";

const repository = AppDataSource.getRepository(User);

export default express.Router()

  /**
   * POST /users/
   * @summary Create a user
   * @tags User
   * @param {object} request.body.required
   * @return {User} 201 - success response
   */
  .post("/", (req, res) => res.status(201).json(repository.create(req.body)))


  .get("/", async (req, res) => res.json((await repository.find())))


  .get("/:id/", async (req, res) => {
    const id = Number(req.params.id);
    return res.json((await repository.findOneBy({ id })));
  })

  .put("/", async (req, res) => res.json((await repository.update(req.body.id, req.body))))

  .delete("/", async (req, res) => {
    const id = req.body.id;
    const user = await repository.findOne(id);
    await repository.delete(id)
    res.json(user);
  });
