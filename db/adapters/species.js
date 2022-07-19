const client = require("../client");

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

async function getSpeciesById(speciesId) {
  try {
    const {
      rows: [species],
    } = await client.query(`SELECT * FROM species WHERE id =${speciesId}`);
    return species;
  } catch (error) {
    throw error;
  }
}

module.exports = { createSpecies, getSpeciesById };
