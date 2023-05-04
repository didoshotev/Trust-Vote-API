const mongoose = require('mongoose')
const { PLAN_TYPES } = require('../settings/constants')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email address is required',
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    plan: {
        type: String,
        required: true,
        default: PLAN_TYPES.FREE,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
