const express = require('express')
const router = express.Router()
const Poll = require('../models/Poll')
const { validationResult } = require('express-validator');
const { validatePollParams } = require('../utils/middlewares/poll')

router.get('/polls', async (req, res) => {
    try {
        const polls = await Poll.find()
        res.send(polls)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

router.post('/poll', validatePollParams, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, admin, startTime, endTime, isActive, options, description } = req.body;

        const poll = await Poll.create({
            name,
            admin,
            startTime,
            endTime,
            isActive,
            options: [],
            description
        });

        res.send(poll);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

module.exports = router
