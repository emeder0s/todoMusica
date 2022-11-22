const mongoose = require("../databases/mongo.js");
const CenterModel = require("../models/center.model.js");

const _center = {
    /**
     * Devuelve todos los centros
     * @param {json} req 
     * @param {json} res 
     * @returns {json }
     */
    getAll: async (req, res) => {
        await mongoose.conn();
        var centers = await CenterModel.find({});
        return centers;
    },

}

module.exports = _center;