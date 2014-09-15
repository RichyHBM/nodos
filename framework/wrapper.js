var dataStore = require('./data-store');
var nodeInfo = require('./node-info');

var wrapper = {};

wrapper.update = function() {
    //Dont store more than 3 days worth
    var info = nodeInfo.getRawInfo();
    info.timestamp = new Date().getTime();
    dataStore.db.insert( info );
    var maxTime = new Date().getTime() - (3 * 24 * 60 * 60 * 1000);
    dataStore.db.remove(
        { timestamp: 
            { $lt: maxTime } 
        }, 
        { multi: true }
    );
}

wrapper.getSystemInfo = function() {
  return nodeInfo.getSystemInfo();
}

wrapper.getRawInfo = function() {
  return nodeInfo.getRawInfo();
}

module.exports = wrapper;