const Orders = require("../models/order.model");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const order = {
    /**
     * Inserta un registro en la tabla orders de la base de datos, el cual
     * tiene los datos de una orden con un punto de recogida. (el campo fk_id_address esta vacio)
     * @param {*} req 
     * @param {*} res 
     */
    new_order_pickup: async (req,res)=>{
        const { pickup_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ pickup_address, order_number, fk_id_user }));
    },    

    /**
     * Inserta un registro en la tabla orders de la base de datos, el cual
     * tiene los datos de una orden que se envia a domicilio (el campo pickup_address esta vacio)
     * @param {*} req 
     * @param {*} res 
     */
    new_order_address: async (req,res)=>{
        const { fk_id_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ fk_id_address, order_number, fk_id_user }));
    },

}
module.exports = order