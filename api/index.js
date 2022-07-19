// use express router to set up your routes!
const express = require("express");
const apiRouter = express.Router();
const trainersRouter = require("./trainers");
const typesRouter = require("./types");
const pokemonRouter = require("./pokemon");
const speciesRouter = require("./species");

apiRouter.use("/trainers", trainersRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
