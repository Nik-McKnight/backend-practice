const client = require("../client");
const { getSpeciesById } = require("./species");

async function createPokemon({ speciesId, trainerId = null, name = null }) {
  const species = await getSpeciesById(speciesId);
  try {
    const {
      rows: [pokemon],
    } = await client.query(
      `
              INSERT INTO pokemon("speciesId", "trainerId", name)
              VALUES($1, $2, $3)
              RETURNING *;
          `,
      [speciesId, trainerId, name ? name : species.name]
    );

    return pokemon;
  } catch (error) {
    throw error;
  }
}

async function getAllPokemon() {
  try {
    const {
      rows: [pokemon],
    } = await client.query(
      `
      SELECT *
      FROM pokemon
      `
    );
    return pokemon;
  } catch (error) {
    throw error;
  }
}

module.exports = { createPokemon, getAllPokemon };
