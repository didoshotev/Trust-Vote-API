require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGO_URL

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function connectToMongo() {
    try {
        await client.connect()
        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
        return client
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    connectToMongo,
    mongoInstance: client,
}
