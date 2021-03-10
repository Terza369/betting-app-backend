const ObjectId = require('mongodb').ObjectId;

const db = require('../database/connection').getDb;

module.exports = class Match {
    constructor(startTime, odds, teams, sportId, tournamentId, duration){
        this.startTime = startTime;
        this.odds = odds;
        this.teams = teams;
        this.sportId = sportId;
        this.tournamentId = tournamentId;
        this.duration = duration;
    }

    static _collectionName = 'matches';
    static fetchCounter = 0;

    static getAll(skip, limit, fields, populate) {
        if(populate) {
            return db().collection(Match._collectionName).aggregate([
                {$lookup: {from: 'sports', localField: 'sportId', foreignField: '_id', as: 'sport'}},
                {$unwind: {path: "$sport"}},
                {$lookup: {from: 'tournaments', localField: 'tournamentId', foreignField: '_id', as: 'tournament'}},
                {$unwind: {path: "$tournament"}},
                {$project: {sportId: 0, tournamentId: 0}},
                {$skip: skip},
                {$limit: limit},
                {$project: fields}
            ]).toArray();
        } else {
            return db().collection(Match._collectionName).find({}, {skip: skip, limit: limit}).project(fields).toArray();
        }
    }

    static getOneById(id, fields, populate) {
        if(populate) {
            return db().collection(Match._collectionName).aggregate([
                {$match: {_id: ObjectId(id)}},
                {$lookup: {from: 'sports', localField: 'sportId', foreignField: '_id', as: 'sport'}},
                {$unwind: {path: "$sport"}},
                {$lookup: {from: 'tournaments', localField: 'tournamentId', foreignField: '_id', as: 'tournament'}},
                {$unwind: {path: "$tournament"}},
                {$project: {sportId: 0, tournamentId: 0}},
                {$project: fields}
            ]).toArray();
        } else {
            return db().collection(Match._collectionName).findOne({_id: ObjectId(id)}, {projection: fields});
        }
    }

    static create(obj) {
        return db().collection(Match._collectionName).insertOne(obj);
    }

    static update(id, obj) {
        return db().collection(Match._collectionName).updateOne({_id: id}, {$set: obj});
    }

    static delete(id) {
        return db().collection(Match._collectionName).deleteOne({_id: ObjectId(id)});
    }
}