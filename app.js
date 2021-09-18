const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const allOperators = require("./views/allOperators");
const operatorGameType = require("./views/operatorGameType");
const operatorName = require("./views/operatorName");
const players = require("./views/players");
const bestPlayer = require("./views/bestPlayer");

app.use(express.json());

var url = "mongodb://localhost:27017/gamedb";
const client = new MongoClient(url, { useUnifiedTopology: true });

const dbName = "gamedb";

client
  .connect()
  .then((client) => client.db(dbName).listCollections().toArray())
  // .then((cols) => console.log("Collections", cols))
  .finally(() => client.close());

app.use("/operator", allOperators);

app.use("/operatorGameType", operatorGameType);

app.use("/operatorName", operatorName);

app.use("/players", players);

app.use("/players/best", bestPlayer);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
