var express = require('express');
var router = express.Router();

var wrapper = require('./../framework/wrapper');

/* GET users listing. */
router.get('/system-info', function(req, res) {  ;
  res.send(wrapper.getSystemInfo());
});

router.get('/cpu', function(req, res) {
  res.send(wrapper.getRawInfo().cpus);
});

router.get('/network', function(req, res) {
  res.send(wrapper.getRawInfo().network);
});

module.exports = router;
