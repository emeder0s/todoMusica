const sql = require("../databases/mysql");
const Address = require("../models/address.model")

const address = {
    findAdressById: async (req, res) => {
        res.json(await Address.findOne({ where: { "id": req.body.id } }));
    }
}

module.exports = address;
