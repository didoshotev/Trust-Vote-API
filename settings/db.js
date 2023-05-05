const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
)

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
