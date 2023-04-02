const { getDb } = require('./../util/database')

class TimeStamp {
    constructor(date, time) {
        this.date = date;
        this.time = time;
    }

    save() {
        const db = getDb();
        return db.collection('timestamps').insertOne(this);
    }

    static fetchTimeStamps() {
        const db = getDb();
        return db.collection('timestamps').find().toArray();
    }
}

module.exports = TimeStamp;