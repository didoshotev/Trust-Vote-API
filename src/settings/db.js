const { Sequelize } = require('sequelize')

const uri = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`

const sequelize = new Sequelize(uri)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    return sequelize
}

module.exports = { connectToDatabase, sequelize }
