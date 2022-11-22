const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql');


const Orders_instrument = sequelize.define('orders_instruments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    qty_instrument: {
        type: DataTypes.STRING
    },
    fk_id_instrument: {
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    fk_id_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
    
});
module.exports = Orders_instrument;