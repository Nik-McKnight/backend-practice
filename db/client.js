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

module.exports = { client, createTrainer, createType };
