const { Client } = require("pg");

const dbName = "pokemasters";

const client = new Client(`postgres://localhost:5432/${dbName}`);

module.exports = client;
