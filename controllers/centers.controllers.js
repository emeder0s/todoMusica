const mongoose = require("../databases/mongo.js");
const CenterModel = require("../models/center.model.js");

const _center = {
    getAll: async (req, res) => {
        await mongoose.conn();
        var centers = await CenterModel.find({});
        return centers;
    },

    
}

module.exports = _center;