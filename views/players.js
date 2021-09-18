var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

var url = "mongodb://localhost:27017/gamedb";

router.get("/", (req, res) => {
  var operator = req.query.operator;
  var operatorName = req.query.operatorName;
  var operatorGameType = req.query.operatorGameType;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gamedb");
    dbo
      .collection("game")
      .find(
        {},
        {
          projection: {
            _id: 0,
            dfsSlatePlayers: 1,
            operator: operator,
            operatorGameType: operatorGameType,
            operatorName: operatorName,
          },
        }
      )
      .toArray(function (err, result) {
        if (err) throw err;
        var operators = result.map((x) => x.dfsSlatePlayers);
        res.send(operators);
        db.close();
      });
  });
});

module.exports = router;
