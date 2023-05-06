require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/user')
const { connectToDatabase } = require('./settings/db')

const app = express()

app.use(cors())

app.use(express.json())
app.use(userRoutes)

const PORT = process.env.PORT_DEV || 8080
const HOST = process.env.HOST || '0.0.0.0'

async function startServer() {
    try {
        await connectToDatabase()
        app.listen(PORT, HOST, () => {
            console.log(`Listening at http://${HOST}:${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()
