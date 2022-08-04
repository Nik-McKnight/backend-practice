const express = require("express");
const trainersRouter = express.Router();
const { getAllTrainers } = require("../db/adapters/trainers");

trainersRouter.use((req, res, next) => {
  console.log("A request is being made to /trainers");

  next();
});

trainersRouter.get("/", async (req, res) => {
  const trainers = await getAllTrainers();
  // await res.send({
  //   trainers,
  // });
  res.send({ trainers });
  console.log("hi");
});

module.exports = trainersRouter;
