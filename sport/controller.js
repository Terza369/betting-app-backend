const ObjectId = require('mongodb').ObjectId;

const Sport = require('./data');

exports.getSports = (req, res, next) => {
    console.log('GET /sports');

    Sport.getAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => next(err))

}

exports.createSport = (req, res, next) => {
    console.log('POST /sports');
    
    Sport.create(req.body)
        .then(result => {
            res.status(201).json({
                insertedCount: result.insertedCount,
                sport: req.body
            });
        })
        .catch(err => {
            err.statusCode = 422;
            next(err);
        })
}

exports.updateSport = (req, res, next) => {
    console.log('PUT /sports/' + req.params.id);

    const id = ObjectId(req.params.id);

    Sport.update(id, req.body)
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

exports.deleteSport = (req, res, next) => {
    console.log('DELETE /sports/' + req.params.id);

    const id = ObjectId(req.params.id);

    Sport.delete(id)
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