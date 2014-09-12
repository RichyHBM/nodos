var express = require('express');
var router = express.Router();

var sysInfo = require('./../system_info/full-info')

/* GET users listing. */
router.get('/', function(req, res) {  ;
  res.send(sysInfo.getRawInfo());
});

router.get('/cpu', function(req, res) {
  res.send(sysInfo.getRawInfo().cpus);
});

router.get('/network', function(req, res) {
  res.send(sysInfo.getRawInfo().network);
});

module.exports = router;
