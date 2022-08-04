const client = require("../client");

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

async function getAllTrainers() {
  try {
    console.log("Trying to fetch trainers");
    const {
      rows: [trainers],
    } = await client.query(`
      SELECT * 
      FROM trainers;
    `);
    console.log("Fetched trainers");

    return trainers;
  } catch (error) {
    throw error;
  }
}

module.exports = { createTrainer, getAllTrainers };
