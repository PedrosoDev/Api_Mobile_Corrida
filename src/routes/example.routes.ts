import express from "express";
import AppDataSource from "../AppDataSource";
import Question from "../models/Question.model";

const repository = AppDataSource.getRepository(Question);

export default express.Router()

  .post("/", (req, res) => res.status(201).json(repository.create(req.body)))

  // .get("/", async (req, res) => res.json('teste'))
  .get("/", async (req, res) => res.json((await repository.find())))

  .put("/", async (req, res) => res.json((await repository.update(req.body.id, req.body))))

  .delete("/", async (req, res) => {
    const id = req.body.id;
    const user = await repository.findOne(id);
    await repository.delete(id)
    res.json(user);
  });
