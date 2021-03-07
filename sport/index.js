const router = require('express').Router();

const sportController = require('./controller');

router.get('/', sportController.getSports);

router.post('/', sportController.createSport);

router.put('/:id', sportController.updateSport);

router.delete('/:id', sportController.deleteSport);

module.exports = router;