const sql = require("../databases/mysql");
const Instruments = require("../models/instrument.model")

const instruments = {
    findAll: async (req, res) => {
        let conexion = sql.sqlConexion();
        const instrumentos = await Instruments.findAll();
        conexion.close();
        res.json(instrumentos);
    }
}

module.exports = instruments;
