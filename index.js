require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { connectToMongo } = require('./settings/mongo')

const app = express()

app.use(cors())

const PORT = process.env.PORT_DEV

async function startServer() {
    try {
        await connectToMongo()

        app.listen(PORT, () => {
            console.log(`Listening at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()