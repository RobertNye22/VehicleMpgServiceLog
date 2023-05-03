var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('maintenance', { title: 'maintenance entry' });
});

module.exports = router;
