const db = require('../database/connection').getDb;

module.exports = class Sport {
    constructor(name, priority){
        this.name = name;
        this.priority = priority;
    }

    static _collectionName = 'sports';

    static getAll() {
        return db().collection(Sport._collectionName).find().toArray();
    }

    static create(obj) {
        return db().collection(Sport._collectionName).insertOne(obj);
    }

    static update(id, obj) {
        return db().collection(Sport._collectionName).updateOne({_id: id}, {$set: obj});
    }

    static delete(id) {
        return db().collection(Sport._collectionName).deleteOne({_id: id});
    }
}