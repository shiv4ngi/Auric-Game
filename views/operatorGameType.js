var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

var url = "mongodb://localhost:27017/gamedb";

router.get("/", (req, res) => {
  var operator = req.query.operator;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gamedb");
    dbo
      .collection("game")
      .find(
        {},
        { projection: { _id: 0, operatorGameType: 1, operator: operator } }
      )
      .toArray(function (err, result) {
        if (err) throw err;
        var operators = result.map((x) => x.operatorGameType);
        // res.send(operators);
        var uniqueOperators = [...new Set(operators)];
        res.send(uniqueOperators);
        db.close();
      });
  });
});

module.exports = router;
