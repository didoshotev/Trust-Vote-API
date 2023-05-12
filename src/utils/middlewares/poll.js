const { body } = require('express-validator')

const validatePollParams = [
    body('name').notEmpty().withMessage('Name is required'),
    body('admin').notEmpty().withMessage('Admin is required'),
    body('startTime').notEmpty().withMessage('Start time is required'),
    body('endTime').notEmpty().withMessage('End time is required'),
    body('isActive').notEmpty().withMessage('Is active is required'),
    body('options').notEmpty().withMessage('Options are required'),
    body('description').notEmpty().withMessage('Description is required'),
];

module.exports = { validatePollParams }