const sql = require("../databases/mysql");
const Address = require("../models/address.model")

const address = {
    findAdressById: async (req, res) => {
        res.json(await Address.findOne({ where: { "id": req.body.id } }));
    },
    createAddress: async (req, res) => {
        const { way_type, address, a_number, additional_address, locality, province, country, postal_code } = req.body;
        const new_address = await Address.create({ way_type, address, a_number, additional_address, locality, province, country, postal_code });
        res.json(new_address);
    }
}

module.exports = address;
