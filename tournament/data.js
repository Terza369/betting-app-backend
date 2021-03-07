const db = require('../database/connection').getDb;

module.exports = class Tournament {
    constructor(name, priority, sportId){
        this.name = name;
        this.priority = priority;
        this.sportId = sportId;
    }

    static  _collectionName = 'tournaments';

    static getAll() {
        return db().collection(Tournament._collectionName).find().toArray();
    }

    static create(obj) {
        return db().collection(Tournament._collectionName).insertOne(obj);
    }

    static update(id, obj) {
        return db().collection(Tournament._collectionName).updateOne({_id: id}, {$set: obj});
    }

    static delete(id) {
        return db().collection(Tournament._collectionName).deleteOne({_id: id});
    }
}