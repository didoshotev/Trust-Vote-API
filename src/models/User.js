const { DataTypes } = require('sequelize')
const { sequelize } = require('../settings/db')
const { PLAN_TYPES, DB_USERS_TABLE } = require('../settings/constants')

const User = sequelize.define(
    'user',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plan: {
            type: DataTypes.ENUM(
                PLAN_TYPES.FREE,
                PLAN_TYPES.STANDARD,
                PLAN_TYPES.PRO
            ),
            allowNull: false,
            defaultValue: 'free',
        },
    },
    {
        timestamps: false, 
        tableName: DB_USERS_TABLE,
    }
)

User.sync().then(() => console.log('User Model synced'))

module.exports = User
