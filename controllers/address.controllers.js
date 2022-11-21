const sql = require("../databases/mysql");
const Address = require("../models/address.model")

const address = {
    /**

     * Devuelve el address almanado en la base de datos que tiene como
     * id el que pasamos en el body de la peticion.
     * @param {*} req 
     * @param {*} res 
     */
    findAdressById: async (req, res) => {
        res.json(await Address.findOne({ where: { "id": req.body.id } }));
    },

    /**
     * Inserta un registro en la tabla addresses con los datos que
     * pasamos en el body de la peticion.
     * @param {*} req 
     * @param {*} res 
     */
    createAddress: async (req, res) => {
        const { way_type, address, a_number, additional_address, locality, province, country, postal_code } = req.body;
        const new_address = await Address.create({ way_type, address, a_number, additional_address, locality, province, country, postal_code });
        res.json(new_address);
    }
}

module.exports = address;
