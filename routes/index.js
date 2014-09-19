var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/details', function(req, res) {
  res.render('details', {});
});

module.exports = router;
