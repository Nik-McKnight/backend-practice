const client = require("../client");

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

module.exports = { createType };
