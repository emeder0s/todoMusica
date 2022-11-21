const { Sequelize } = require('sequelize');

const sequelize =  new Sequelize('todo_musica', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No conectado: ' + err)
    });

module.exports = sequelize

