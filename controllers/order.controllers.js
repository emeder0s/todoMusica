const Orders = require("../models/order.model");

const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const order = {
    new_order_pickup: async (req,res)=>{
        const { pickup_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ pickup_address, order_number, fk_id_user }));
    },    

    new_order_address: async (req,res)=>{
        const { fk_id_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ fk_id_address, order_number, fk_id_user }));
    },

}
module.exports = order