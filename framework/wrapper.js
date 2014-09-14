var dataStore = require('./data-store');
var fullInfo = require('./system-info');

var wrapper = {};

wrapper.update = function() {
    //Dont store more than 3 days worth
    var info = fullInfo.getRawInfo();
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
  return fullInfo.getSystemInfo();
}

wrapper.getRawInfo = function() {
  return fullInfo.getRawInfo();
}

module.exports = wrapper;