const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    options: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PollOption',
        required: true,
    },
    votes: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll
