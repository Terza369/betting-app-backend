const ObjectId = require('mongodb').ObjectId;

const Tournament = require('./data');

exports.getTournaments = (req, res, next) => {
    console.log('GET /tournaments');

    Tournament.getAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => next(err))

}

exports.createTournament = (req, res, next) => {
    console.log('POST /tournaments');

    if(req.body.sportId) {
        req.body.sportId = ObjectId(req.body.sportId);
    }
    
    Tournament.create(req.body)
        .then(result => {
            res.status(201).json({
                insertedCount: result.insertedCount,
                tournament: req.body
            });
        })
        .catch(err => {
            err.statusCode = 422;
            next(err);
        })
}

exports.updateTournament = (req, res, next) => {
    console.log('PUT /tournaments/' + req.params.id);

    const id = ObjectId(req.params.id);
    if(req.body.sportId) {
        req.body.sportId = ObjectId(req.body.sportId);
    }

    Tournament.update(id, req.body)
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
        })
}

exports.deleteTournament = (req, res, next) => {
    console.log('DELETE /tournaments/' + req.params.id);

    const id = ObjectId(req.params.id);

    Tournament.delete(id)
        .then(result => {
            res.status(200).json({
                deletedCount: result.deletedCount
            });
        })
        .catch(err => {
            err.statusCode = 422;
            next(err);
        })
}