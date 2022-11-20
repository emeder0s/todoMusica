const Users = require("../models/user.model");
const Address = require("../models/address.model");
const Orders = require("../models/order.model");
const Orders_Instruments = require("../models/order_instrument.model");

const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const order = {
    new_order_pickup: (req,res)=>{
        
    },    
    new_order_address: (req,res)=>{

    }
}
module.exports = order