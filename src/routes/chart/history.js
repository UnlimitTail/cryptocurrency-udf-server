var express = require('express');
var router = express.Router();
const CUG = require('cryptocurrency-udf-gateway');

const EMPTY_HISTORY = {t: [], o: [], h: [], l: [], c: [], v: [], s: 'ok'};

router.get('/', function(req, res, next) {
  const {
    symbol,
    resolution
  } = req.query;

  const param = new CUG.Chart.Helpers.HistoryParam({
    symbol,
    resolution
  });

  CUG.Chart.Helpers.history(param, function(err, result){
    if (err){
      res.json(EMPTY_HISTORY);
    } else {
      res.json(result);
    }
  })
});

module.exports = router;
