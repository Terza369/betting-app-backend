const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator')

const Match = require('./data');
const MatchService = require('./service');
const Sport = require('../sport/data');
const Tournament = require('../tournament/data');

exports.getMatches = (req, res, next) => {
    console.log('GET /matches');

    let {skip, limit, fields, populate} = req.query;
    skip = MatchService.parseSkip(skip);
    limit = MatchService.parseLimit(limit);
    fields = MatchService.parseFields(fields, populate);

    Match.getAll(skip, limit, fields, populate)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => next(err))

}

exports.getEverything = (req, res, next) => {
    console.log('GET /matches/everything');

    let {skip, limit, fields, populate, reset} = req.query;
    skip = MatchService.parseSkip(skip);
    limit = MatchService.parseLimit(limit);
    fields = MatchService.parseFields(fields, populate);

    const sports = Sport.getAll();
    const tournaments = Tournament.getAll();
    const matches = Match.getAll(skip, limit, fields, populate);

    Promise.all([sports, tournaments, matches])
        .then(result => {
            let sports = result[0];
            let tournaments = result[1];
            let matches = result[2];
            
            if(reset) {
                let promiseArray = [];
                matches.forEach(match => {
                    let newTime = (new Date()).setSeconds((Math.random() * (60 - 1) + 1));
                    promiseArray.push(Match.update(match._id, {startTime: new Date(newTime)}));
                })
                
                Promise.all(promiseArray)
                    .then(() => {
                        return Match.getAll(skip, limit, fields, populate);
                    })
                    .then(matches => {
                        matches = matches.map(match => {
                            match = MatchService.calculateMinutes(match);
                            match = MatchService.resetScore(match);
                            return match;
                        });
            
                        sports = MatchService.sortAndStructure(sports, tournaments, matches);
            
                        res.status(200).json(sports);
                    })
                    .catch(err => next(err))
            } else {
                Match.getAll(skip, limit, fields, populate)
                    .then(matches => {
                        matches = matches.map(match => {
                            match = MatchService.calculateMinutes(match);
                            match = MatchService.resetScore(match);
                            return match;
                        });
            
                        sports = MatchService.sortAndStructure(sports, tournaments, matches);            
            
                        res.status(200).json(sports);
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
}

exports.increment = (req, res, next) => {
    console.log('PUT /matches/everything/increment');

    console.log('1:');
    console.log(req.body[0].tournaments[0].matches[0].score);

    req.body.forEach(sport => {
        sport.tournaments.forEach(tournament => {
            tournament.matches.forEach((match, index) => {
                tournament.matches[index] = MatchService.calculateMinutes(match);
                tournament.matches[index] = MatchService.incrementScores(match);
            })
        });
    });

    console.log('2:');
    console.log(req.body[0].tournaments[0].matches[0].score);

    res.status(200).json(req.body);
}

exports.getMatchById = (req, res, next) => {
    console.log('GET /matches/' + req.params.id);

    let {fields, populate} = req.query;
    fields = MatchService.parseFields(fields, populate);

    Match.getOneById(req.params.id, fields, populate)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => next(err))
}

exports.createMatch = (req, res, next) => {
    console.log('POST /matches');

    const errors = validationResult(req);

    if(errors.isEmpty()) {

        let {startTime, teams, sportId, tournamentId, duration} = req.body;

        startTime = MatchService.createDateTime(startTime.date, startTime.hours, startTime.minutes, startTime.seconds)
        const odds = MatchService.randomizeOdds(5, 1.01);

        const match = new Match(startTime, odds, teams, new ObjectId(sportId), new ObjectId(tournamentId), parseInt(duration));
        
        Match.create(match)
            .then(result => {
                res.status(201).json({
                    insertedCount: result.insertedCount,
                    match: match
                });
            })
            .catch(err => {
                err.statusCode = 422;
                next(err);
            });
    } else {
        let err = new Error(errors.array()[0].msg);
        err.statusCode = 422;
        next(err);
    }
}

exports.updateMatch = (req, res, next) => {
    console.log('PUT /matches/' + req.params.id);

    const errors = validationResult(req);

    if(errors.isEmpty()) {

        let {startTime, sportId, tournamentId} = req.body;

        const id = new ObjectId(req.params.id);

        if(sportId) {
            sportId = new ObjectId(sportId);
            req.body.sportId = sportId;
        }
        if(tournamentId) {
            tournamentId = new ObjectId(tournamentId);
            req.body.tournamentId = tournamentId;
        }
        if(startTime) {
            if(startTime.date) {
                startTime = MatchService.createDateTime(startTime.date, startTime.hours, startTime.minutes, startTime.seconds);
                req.body.startTime = startTime;
            } else {
                req.body.startTime = new Date(startTime);
            }
        }

        Match.update(id, req.body)
            .then(result => {
                res.status(201).json({
                    modifiedCount: result.modifiedCount,
                    _id: id,
                    fields: req.body
                });
            })
            .catch(err => {
                err.statusCode = 422;
                next(err);
            });
    } else {
        let err = new Error(errors.array()[0].msg);
        err.statusCode = 422;
        next(err);
    }
}

exports.deleteMatch = (req, res, next) => {
    console.log('DELETE /matches/' + req.params.id);

    Match.delete(req.params.id)
        .then(result => {
            res.status(200).json({
                deletedCount: result.deletedCount
            });
        })
        .catch(err => next(err))
}

