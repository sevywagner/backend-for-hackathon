const { getDb } = require('./../util/database')

class Donation {
    constructor(email, amount) {
        this.email = email;
        this.amount = amount;
    }

    save() {
        const db = getDb();
        return db.collection('donations').insertOne(this);
    }
}

module.exports = Donation;