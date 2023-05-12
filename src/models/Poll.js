const { DataTypes } = require('sequelize');
const { sequelize } = require('../settings/db');
const PollOption = require('./PollOption');

const Poll = sequelize.define('poll', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Poll.hasMany(PollOption, { as: 'options', foreignKey: 'poll_id' })

module.exports = Poll;
