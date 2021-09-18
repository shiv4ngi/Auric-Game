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
      .find({
        $and: [
          { operator: operator },
          { operatorGameType: operatorGameType },
          { operatorName: operatorName },
        ],
      })
      //TODO: Find a way to use MongoDB sort and limit
      .toArray(function (err, result) {
        if (err) throw err;
        var operators = result.map((x) => x.dfsSlatePlayers);
        var flatArray = Array.prototype.concat.apply([], operators);

        flatArray = flatArray.sort(function (a, b) {
          return b.fantasyPoints - a.fantasyPoints;
        });
        res.send(flatArray[0]);
        db.close();
      });
  });
});

module.exports = router;
