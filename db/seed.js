// -------This file will Reset your Database--------- //

const {
  client,
  createTrainer,
  createType,
  createSpecies,
  createPokemon,
} = require("./client");

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
    await createTrainer({
      username: "Satoshi1996",
      password: "Hunter2",
      name: "Ash Ketchum",
    });
    await createTrainer({
      username: "XxAshSmellzxX",
      password: "passw0rd",
      name: "Gary Oak",
    });
    await createTrainer({
      username: "BrockHard",
      password: ":hearteyes",
      name: "Brock",
    });
    console.log("Created initial trainers.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialTypes() {
  try {
    console.log("Creating initial types...");
    await createType({
      name: "Normal",
    });

    await createType({
      name: "Grass",
    });

    await createType({
      name: "Water",
    });

    await createType({
      name: "Fire",
    });

    await createType({
      name: "Electric",
    });

    await createType({
      name: "Ground",
    });

    await createType({
      name: "Rock",
    });

    await createType({
      name: "Steel",
    });

    await createType({
      name: "Fighting",
    });

    await createType({
      name: "Flying",
    });

    await createType({
      name: "Dragon",
    });

    await createType({
      name: "Dark",
    });

    await createType({
      name: "Bug",
    });

    await createType({
      name: "Psychic",
    });

    await createType({
      name: "Ghost",
    });

    await createType({
      name: "Fairy",
    });

    await createType({
      name: "Ice",
    });

    await createType({
      name: "Poison",
    });

    await createType({
      name: "???",
    });

    console.log("Created initial typees.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialSpecies() {
  try {
    console.log("Creating initial species...");
    await createSpecies({
      name: "Geodude",
      primaryTypeId: 8,
      secondaryTypeId: 7,
    });
    await createSpecies({
      name: "Pikachu",
      primaryTypeId: 6,
    });
    console.log("Created initial species.");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialPokemon() {
  try {
    console.log("Creating initial pokemon...");
    await createPokemon({
      speciesId: 1,
    });
    await createPokemon({
      speciesId: 1,
      name: "GeoBro",
    });
    await createPokemon({
      speciesId: 1,
      name: "GeoBro",
      trainerId: 2,
    });
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
    client.end();
  }
};

// Call the rebuildDb function
rebuildDb();
