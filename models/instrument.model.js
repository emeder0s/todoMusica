const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql');

const Instruments = sequelize.define('instruments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    photo_path: DataTypes.STRING,

}, {
    timestamps: false
});

module.exports = Instruments;
