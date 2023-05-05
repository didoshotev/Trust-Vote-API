require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/user')
const { connectToDatabase } = require('./settings/db')

const app = express()

app.use(cors())

app.use(express.json())
app.use(userRoutes)

const PORT = process.env.PORT_DEV

async function startServer() {
    try {
        await connectToDatabase()
        app.listen(PORT, () => {
            console.log(`Listening at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()
