const Sequelize = require('sequelize')

function sqlConexion() {
    const sequelize = new Sequelize('todomusica', 'root', 'root', {
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
    return sequelize;
}

module.exports = {sqlConexion};

