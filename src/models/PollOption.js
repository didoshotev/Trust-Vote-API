const { DataTypes } = require('sequelize')
const { sequelize } = require('../settings/db')
const Poll = require('./Poll')

    const PollOption = sequelize.define('PollOption', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

// PollOption.belongsTo(Poll, { as: 'poll', foreignKey: 'poll_id', targetKey: 'id' });

module.exports = PollOption;
