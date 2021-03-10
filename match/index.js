const router = require('express').Router();

const matchController = require('./controller');
const { postValidator, putValidator } = require('../middleware/isValid');

router.get('/', matchController.getMatches);

router.get('/everything', matchController.getEverything);

router.put('/everything/increment', matchController.increment);

router.get('/:id', matchController.getMatchById);

router.post('/', postValidator, matchController.createMatch);

router.put('/:id', putValidator, matchController.updateMatch);

router.delete('/:id', matchController.deleteMatch);

module.exports = router;