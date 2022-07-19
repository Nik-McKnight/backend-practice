const { Client } = require("pg");

const dbName = "pokemasters";

const client = new Client(`postgres://localhost:5432/${dbName}`);

async function createTrainer({ username, password, name }) {
  try {
    const {
      rows: [trainer],
    } = await client.query(
      `
        INSERT INTO trainers(username, password, name)
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `,
      [username, password, name]
    );
    return trainer;
  } catch (error) {
    throw error;
  }
}

async function createType({ name }) {
  try {
    const {
      rows: [type],
    } = await client.query(
      `
          INSERT INTO types(name)
          VALUES($1)
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
      `,
      [name]
    );
    return type;
  } catch (error) {
    throw error;
  }
}

async function createSpecies({ name, primaryTypeId, secondaryTypeId = null }) {
  try {
    const {
      rows: [species],
    } = await client.query(
      `
            INSERT INTO species(name, "primaryTypeId", "secondaryTypeId")
            VALUES($1, $2, $3)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
      [name, primaryTypeId, secondaryTypeId ? secondaryTypeId : 19]
    );
    return species;
  } catch (error) {
    throw error;
  }
}

async function createPokemon({ speciesId, trainerId = null, name = null }) {
  try {
    const {
      rows: [pokemon],
    } = await client.query(
      `
            INSERT INTO pokemon("speciesId", "trainerId", name)
            VALUES($1, $2, $3)
            RETURNING *;
        `,
      [speciesId, trainerId, name ? name : "Make this show the species name"]
    );
    return pokemon;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createTrainer,
  createType,
  createSpecies,
  createPokemon,
};
