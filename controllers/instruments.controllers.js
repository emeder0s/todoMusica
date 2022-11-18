const sql = require("../databases/mysql");
const Instruments = require("../models/instrument.model")

const instruments = {
    start: (req, res) => {
        res.render("../views/instrumentos.ejs");
    },
    findInstruments: async (req, res) => {
        const instrumentos = await Instruments.findAll();
        res.json(instrumentos);
    },

    findByCategory: async (req, res) => {
        const instrumentos = await Instruments.findAll({
            where: {
                category: req.body.category
            }
        });
        res.json(instrumentos);
    }
}

module.exports = instruments;
