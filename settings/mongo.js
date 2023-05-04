require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const { DB_NAME } = require('./constants')

const uri = process.env.MONGO_URL

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})
const connectToMongo = async () => {
    try {
        await client.connect()
        await client.db(DB_NAME).command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
        return client
    } catch (err) {
        console.log(err)
    }
}

const connectToMongoose = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoCreate: true,
        })
        console.log('Mongoose connected to MongoDB')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = {
    connectToMongo,
    connectToMongoose,
    mongoInstance: client,
}
