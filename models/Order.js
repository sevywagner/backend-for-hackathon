const getDb = require('../util/database').getDb;

class Order {
    constructor(name, address, email, date, time, bloodAmount, numOfPeople, payout) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.date = date;
        this.time = time;
        this.bloodAmount = bloodAmount ? bloodAmount : null;
        this.numOfPeople = numOfPeople ? numOfPeople : null;
        this.payout = payout ? payout : null;
    }

    save() {
        const db = getDb();
        return db.collection('orders').insertOne(this);
    }

    static fetchOrders() {
        const db = getDb();
        return db.collection('orders').find().toArray();
    }
}

module.exports = Order;