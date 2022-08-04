const express = require("express");
const PORT = 4000;
const server = express();

// require and connect to the client
const client = require("./db/client");
client.connect;

// Add any middleware you made need

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

// Add your API routes
server.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

server.use("/api", require("./api"));
//server.use("/db", require("./db"));

// Add an error handler
server.get("*", (req, res, next) => {
  res.status(404).send("Uh oh, what r u looking for?");
});

server.use((error, req, res, next) => {
  res.status(500).send(error);
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
