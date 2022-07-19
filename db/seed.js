// -------This file will Reset your Database--------- //

const client = require("./client");
const { createTrainer } = require("./adapters/trainers");
const { createType } = require("./adapters/types");
const { createSpecies } = require("./adapters/species");
const { createPokemon } = require("./adapters/pokemon");

const { trainers, types, species, pokemon } = require("./seedData");

// Drop Tables
const dropTables = async () => {
  try {
    console.log("Dropping Tables...");
    await client.query(`
    DROP TABLE IF EXISTS pokemon;
    DROP TABLE IF EXISTS species;
    DROP TABLE IF EXISTS types;
    DROP TABLE IF EXISTS trainers;
    `);
    console.log("Tables dropped.");
  } catch (error) {
    console.log("Error dropping tables.");
    throw error;
  }
};
// Create Tables
const createTables = async () => {
  console.log("Building tables...");
  await client.query(`
    CREATE TABLE trainers (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      name varchar(255) NOT NULL
      );
    CREATE TABLE types (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
    CREATE TABLE species (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL,
      "primaryTypeId" INTEGER REFERENCES types(id) NOT NULL,
      "secondaryTypeId" INTEGER REFERENCES types(id)
      );
    CREATE TABLE pokemon (
      id SERIAL PRIMARY KEY,
      "speciesId" INTEGER REFERENCES species(id) NOT NULL,
      name varchar(255) NOT NULL,
      "trainerId" INTEGER REFERENCES trainers(id)
      );
        `);

  console.log("Tables built");
};

async function createInitialTrainers() {
  try {
    console.log("Creating initial trainers...");
    for (const trainer of trainers) {
      await createTrainer(trainer);
    }
    console.log("Created initial trainers.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialTypes() {
  try {
    console.log("Creating initial types...");
    for (const type of types) {
      await createType({ name: type });
    }

    console.log("Created initial typees.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialSpecies() {
  try {
    console.log("Creating initial species...");
    for (const specy of species) {
      await createSpecies(specy);
    }
    console.log("Created initial species.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialPokemon() {
  try {
    console.log("Creating initial pokemon...");
    for (const pokeman of pokemon) {
      await createPokemon(pokeman);
    }
    console.log("Created initial pokemon.");
  } catch (error) {
    console.error(error);
  }
}

// Seed Data
const seedData = async () => {
  await createInitialTrainers();
  await createInitialTypes();
  await createInitialSpecies();
  await createInitialPokemon();
};
// Call all of the functions together and 'BUILD' you db
const rebuildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await seedData();
    // call your functions in the correct order!
  } catch (error) {
    console.log("error during rebuildDB");
    console.error(error);
  } finally {
    //client.end();
  }
};

// Call the rebuildDb function
rebuildDb();
