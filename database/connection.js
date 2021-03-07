const MongoClient = require('mongodb').MongoClient;

const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DATABASE}?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

let _db;

const init = callback => {
    client.connect()
        .then(client => {
            console.log("Database connected");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        })
}

const getDb = () => {
    if(_db) {
        return _db;
    } else {
        throw new Error("Can not connect to the database");
    }
}

module.exports = {
    init,
    getDb
}