const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { validateSignupParams } = require('../utils/middlewares/auth')
const { PLAN_TYPES } = require('../settings/constants')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || 'myrefreshsecretkey'
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '1d'

router.post('/signup', validateSignupParams, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashedPassword,
            plan: PLAN_TYPES.FREE,
        })

        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        })

        res.json({ accessToken, refreshToken })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/login', validateSignupParams, async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }

        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        })

        res.json({ accessToken, refreshToken })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/refresh_token', async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' })
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        const userId = decoded.id

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }

        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })

        res.json({ accessToken })
    } catch (err) {
        console.log('error: ', err)
        return res.status(401).json({ message: 'Invalid refresh token' })
    }
})

router.get('/ping', (req, res) => {
    console.log('PING WORKS')
    res.status(200).send('pong');
});

module.exports = router
