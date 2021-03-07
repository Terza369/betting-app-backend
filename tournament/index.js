const router = require('express').Router();

const tournamentController = require('./controller');

router.get('/', tournamentController.getTournaments);

router.post('/', tournamentController.createTournament);

router.put('/:id', tournamentController.updateTournament);

router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;