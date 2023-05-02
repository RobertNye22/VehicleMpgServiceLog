var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('filluphistory', { title: 'Fill Up History' });
});

module.exports = router;
