// Create some seed data for your DB!
const trainers = [
  { username: "Satoshi1996", password: "Hunter2", name: "Ash Ketchum" },
  { username: "XxAshSmellzxX", password: "passw0rd", name: "Gary Oak" },
  { username: "BrockHard", password: ":hearteyes", name: "Brock" },
];

const types = [
  "Normal",
  "Grass",
  "Water",
  "Fire",
  "Electric",
  "Ground",
  "Rock",
  "Steel",
  "Fighting",
  "Flying",
  "Dragon",
  "Dark",
  "Bug",
  "Psychic",
  "Ghost",
  "Fairy",
  "Ice",
  "Poison",
  "???",
];

const species = [
  { name: "Geodude", primaryTypeId: 8, secondaryTypeId: 7 },
  { name: "Pikachu", primaryTypeId: 6 },
];

const pokemon = [
  { speciesId: 1 },
  { speciesId: 1, name: "GeoBro" },
  { speciesId: 1, name: "GeoBro", trainerId: 2 },
];

module.exports = { trainers, types, species, pokemon };
