const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databases/mysql').sqlConexion();

const Users = sequelize.define('USERS', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
});
sequelize.close();
module.exports = Users;