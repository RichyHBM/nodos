var express = require('express');
var router = express.Router();

var wrapper = require('./../framework/wrapper');

/* GET users listing. */
router.get('/raw-info', function(req, res) {  ;
  res.send(wrapper.getRawInfo());
});

router.get('/detail-info', function(req, res) {  ;
  res.send(wrapper.getDetailInfo());
});

router.get('/cpu', function(req, res) {
  res.send(wrapper.getRawInfo().cpus);
});

router.get('/network', function(req, res) {
  res.send(wrapper.getRawInfo().network);
});

module.exports = router;
