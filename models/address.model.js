const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql');

const Address = sequelize.define('addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    way_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    a_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    additional_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    postal_code: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});
module.exports = Address;