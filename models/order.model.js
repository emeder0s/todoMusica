const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql');


const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_number: {
        type: DataTypes.STRING
    },
    order_date: {
        type: DataTypes.DATE
    },
    fk_id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    fk_id_address: {
        type: DataTypes.INTEGER
    },
    pickup_address: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
    
});
module.exports = Order;