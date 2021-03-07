const { body } = require('express-validator');

exports.postValidator = [
    body('startTime.date')
        .isDate()
        .withMessage('Invalid date'),
    body('startTime.hours')
        .isInt({min: 1, max: 24})
        .withMessage('Hours must be an integer between 1 and 24'),
    body('startTime.minutes')
        .isInt({min: 0, max: 59})
        .withMessage('Minutes must be an integer between 0 and 59'),
    body('teams')
        .isArray({min: 2, max: 2})
        .withMessage('Teams must be an array and contain 2 elements'),
    body('duration')
        .isInt({min: 1, max: 360})
        .withMessage('Duration must be an integer between 1 and 360')
]

exports.putValidator = [
    body('startTime.date')
        .optional()
        .isDate()
        .withMessage('Invalid date'),
    body('startTime.hours')
        .optional()
        .isInt({min: 1, max: 24})
        .withMessage('Hours must be an integer between 1 and 24'),
    body('startTime.minutes')
        .optional()
        .isInt({min: 0, max: 59})
        .withMessage('Minutes must be an integer between 0 and 59'),
    body('startTime.seconds')
        .optional()
        .isInt({min: 0, max: 59})
        .withMessage('Seconds must be an integer between 0 and 59'),
    body('teams')
        .optional()
        .isArray({min: 2, max: 2})
        .withMessage('Teams must be an array and contain 2 elements'),
    body('duration')
        .optional()
        .isInt({min: 1, max: 360})
        .withMessage('Duration must be an integer between 1 and 360'),
    body('odds')
        .optional()
        .isFloat({min: 1.01, max: 5})
        .withMessage('Odds must be a float between 1.01 and 5')
]