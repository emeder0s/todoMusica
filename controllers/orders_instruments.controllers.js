const Orders_Instruments = require("../models/order_instrument.model");

const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const order_instrument = {
    /**
     * Inserta un regustro en la tabla order instruments dentro de la base de datos
     * cuyos datos se pasan en el body de la peticion.
     * @param {json} req 
     * @param {json} res 
     */
    new_order_instru: async (req,res)=>{
        const { qty_instrument, fk_id_instrument, fk_id_order } = req.body;
        res.json(await Orders_Instruments.create({ qty_instrument, fk_id_instrument, fk_id_order }));
    }
}
module.exports = order_instrument