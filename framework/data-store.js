var Datastore = require('nedb');

var store = {};

store.db = new Datastore({ filename: './system-database.nedb' });
store.db.loadDatabase();
store.db.persistence.setAutocompactionInterval(30 * 60 * 1000); //Compact every 30 minutes
store.db.persistence.compactDatafile();

module.exports = store;