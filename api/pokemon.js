const express = require("express");
const pokemonRouter = express.Router();
const { getAllPokemon } = require("../db/adapters/pokemon");

pokemonRouter.use((req, res, next) => {
  console.log("A request is being made to /pokemon");

  next();
});

pokemonRouter.get("/", async (req, res) => {
  try {
    const pokemon = await getAllPokemon();
    res.send(pokemon);
  } catch (error) {
    console.error(error);
  }
});

module.exports = pokemonRouter;
