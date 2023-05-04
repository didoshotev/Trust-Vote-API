require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const { connectToMongo, connectToMongoose } = require('./settings/mongo')
const pollOptionRoute = require('./routes/poll')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors())

app.use(express.json())
app.use(pollOptionRoute)
app.use(userRoutes)

const PORT = process.env.PORT_DEV

async function startServer() {
    try {
        await connectToMongo()
        await connectToMongoose()

        app.listen(PORT, () => {
            console.log(`Listening at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()
