const client = require("../client");

const express = require("express");
const trainersRouter = express.Router();

trainersRouter.get("/", async (req, res) => {});

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

module.exports = { trainersRouter, createTrainer };
