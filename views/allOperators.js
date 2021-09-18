var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

var url = "mongodb://localhost:27017/gamedb";

router.get("/operator", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gamedb");
    dbo
      .collection("game")
      .find({}, { projection: { _id: 0, operator: 1 } })
      .toArray(function (err, result) {
        if (err) throw err;
        var operators = result.map((x) => x.operator);
        res.send(operators);
        db.close();
      });
  });
});

module.exports = router;
