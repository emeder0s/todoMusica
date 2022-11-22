const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql');


const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_password: {
        type: DataTypes.STRING
    },
    isbuyer: {
        type: DataTypes.BOOLEAN
    },
    fk_id_address: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
    
});
module.exports = Users;