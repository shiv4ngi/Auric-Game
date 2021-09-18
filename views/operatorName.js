var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

var url = "mongodb://localhost:27017/gamedb";

router.get("/", (req, res) => {
  var operator = req.query.operator;
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
            operator: operator,
            operatorGameType: operatorGameType,
            operatorName: 1,
          },
        }
      )
      .toArray(function (err, result) {
        if (err) throw err;
        var operators = result.map((x) => x.operatorName);
        res.send(operators);
        db.close();
      });
  });
});

module.exports = router;
