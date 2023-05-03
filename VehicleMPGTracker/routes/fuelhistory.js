var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fuelhistory', { title: 'fuelHistory' });
});

module.exports = router;
