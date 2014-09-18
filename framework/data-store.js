var Datastore = require('nedb');
var os = require('os');

var store = {};

store.db = new Datastore(); //{ filename: './system-database.nedb' });
store.db.loadDatabase();
//store.db.persistence.setAutocompactionInterval(30 * 60 * 1000); //Compact every 30 minutes
//store.db.persistence.compactDatafile();

store.update = function()
{
    var info = {};
    info.cpu = os.cpus();
    //Dont store more than 3 days worth
    info.timestamp = new Date().getTime();
    store.db.insert( info );
    var maxTime = new Date().getTime() - (3 * 24 * 60 * 60 * 1000);
    store.db.remove(
        { timestamp: 
            { $lt: maxTime } 
        }, 
        { multi: true }
    );
}

module.exports = store;