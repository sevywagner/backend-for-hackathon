const mongodb = require('mongodb');

let _db;

const mongoConnect = (callback) => {
    mongodb.MongoClient.connect(process.env.MONGO_URI).then((client) => {
        console.log('Connected');
        _db = client.db();
        callback();
    }).catch((err) => {
        console.log(err);
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;