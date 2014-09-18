var express = require('express');
var router = express.Router();

var dataStore = require('./../framework/data-store');
var nodeInfo = require('./../framework/node-info');
var linuxInfo = require('./../framework/linux-info');

/* GET users listing. */
router.get('/raw-info', function(req, res) {  ;
  res.send(nodeInfo.getRawInfo());
});

router.get('/detail-info', function(req, res) {  ;
  res.send(linuxInfo.getDetailInfo());
});

router.get('/cpu', function(req, res) {
  res.send(nodeInfo.getRawInfo().cpus);
});

router.get('/network', function(req, res) {
  res.send(nodeInfo.getRawInfo().network);
});

router.get('/processCount', function(req, res) {
    res.send( linuxInfo.processCount() );
});

router.get('/sessionCount', function(req, res) {
    res.send( linuxInfo.sessionCount() );
});

router.get('/fileHandles', function(req, res) {
    res.send( linuxInfo.fileHandles() );
});

router.get('/fileHandlesLimit', function(req, res) {
    res.send( linuxInfo.fileHandlesLimit() );
});

router.get('/ramTotal', function(req, res) {
    res.send( linuxInfo.ramTotal() );
});

router.get('/ramFree', function(req, res) {
    res.send( linuxInfo.ramFree() );
});

router.get('/ramCached', function(req, res) {
    res.send( linuxInfo.ramCached() );
});

router.get('/ramBuffers', function(req, res) {
    res.send( linuxInfo.ramBuffers() );
});

router.get('/swapTotal', function(req, res) {
    res.send( linuxInfo.swapTotal() );
});

router.get('/swapFree', function(req, res) {
    res.send( linuxInfo.swapFree() );
});

router.get('/diskTotal', function(req, res) {
    res.send( linuxInfo.diskTotal() );
});

router.get('/diskUsage', function(req, res) {
    res.send( linuxInfo.diskUsage() );
});

router.get('/activeConnections', function(req, res) {
    res.send( linuxInfo.activeConnections() );
});






module.exports = router;
