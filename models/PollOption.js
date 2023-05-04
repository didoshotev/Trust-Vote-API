const mongoose = require('mongoose')

const pollOptionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

const PollOption = mongoose.model('PollOption', pollOptionSchema)

module.exports = PollOption
