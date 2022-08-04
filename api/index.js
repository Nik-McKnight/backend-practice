// use express router to set up your routes!
const express = require("express");
const trainersRouter = require("./trainers");
const typesRouter = require("./types");
const pokemonRouter = require("./pokemon");
const speciesRouter = require("./species");
const apiRouter = express.Router();
const { getAllPokemon } = require("../db/adapters/pokemon");

apiRouter.use((req, res, next) => {
  console.log("A request is being made to /api");
  next();
});

apiRouter.get("/", async (req, res, next) => {
  const pokemon = await getAllPokemon();
  res.send(pokemon);

  res.send("hi im api");
});

apiRouter.use("/trainers", trainersRouter);
apiRouter.use("/types", typesRouter);
apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/species", speciesRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
