const sql = require("../databases/mysql");
const Instruments = require("../models/instrument.model")

const instruments = {
    /**
     * Devuelve todos los intrumentos almacenados en la base de datos
     * @param {json} req 
     * @param {json} res 
     */
    findInstruments: async (req, res) => {
        res.json(await Instruments.findAll());
    },

    /**
     * Devuelve todos los instrumentos de una categoria concreta.
     * @param {json} req 
     * @param {json} res 
     */
    findByCategory: async (req, res) => {
        res.json(await Instruments.findAll({where: {category: req.body.category}}));
    }
}

module.exports = instruments;
