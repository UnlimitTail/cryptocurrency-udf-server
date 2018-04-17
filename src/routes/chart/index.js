var express = require('express');
var router = express.Router();
const CUG = require('cryptocurrency-udf-gateway');

router.get('/config', function(req, res, next) {
  CUG.Chart.Helpers.config(function(err, result){
    if (err){
      res.json(EMPTY_HISTORY);
    } else {
      res.json(result);
    }
  })
});

const EMPTY_HISTORY = {t: [], o: [], h: [], l: [], c: [], v: [], s: 'ok'};
router.get('/history', function(req, res, next) {
  const {
    symbol,
    resolution,
    from,
    to,
  } = req.query;

  const param = new CUG.Chart.Helpers.HistoryParam({
    symbol,
    resolution,
    from,
    to,
  });

  CUG.Chart.Helpers.history(param, function(err, result){
    if (err){
      res.json(EMPTY_HISTORY);
    } else {
      res.json(result);
    }
  })
});

router.get('/symbols', function(req, res, next) {
  const {
    symbol
  } = req.query;

  CUG.Chart.Helpers.symbols(symbol, function(err, result){
    res.json(result);
  });
});

router.get('/time', function(req, res, next) {
  res.send(String(Math.floor(new Date().getTime()/1000)));
});

module.exports = router;
