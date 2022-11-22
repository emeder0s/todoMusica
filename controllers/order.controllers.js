const Orders = require("../models/order.model");
const OrdersInstruments = require("../models/order_instrument.model");
const Instruments = require("../models/instrument.model");
const _user = require("../controllers/users.controllers");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const address = require("./address.controllers");

function getTotalPrice(instruments){
    var total = 0;
    instruments.forEach(element => {
        var price = element.instrument.price;
        price = parseInt(price.split(" ")[0]);
        price = price * parseInt(element.quantity);
        total += price;
    })

    return total;
}

async function getAddress(order){
    if(order.pickup_address){
        return order.pickup_address;
    }else{
        return await address.returnAddressById(order.fk_id_address);
    }
}

async function getInstruments(orders_instruments){
    var instrumentsArrays= []
    for await (var o_i of orders_instruments){
            var instrument = await Instruments.findOne({ where: { id: o_i.dataValues.fk_id_instrument } });
            var instrumentJSON = {
                instrument:instrument.dataValues,
                quantity: o_i.dataValues.qty_instrument,
            }
            instrumentsArrays.push(instrumentJSON)
    }    
    return instrumentsArrays;
}

async function getOrdersInstrument(order){
    var orders_instrument = await OrdersInstruments.findAll({ where: { fk_id_order: order.dataValues.id } });
    var instruments = await getInstruments(orders_instrument);
    return instruments;
}



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

    get_by_user: async (email) => {
        var user =   await _user.returnUserByEmail(email);
        var orders = await Orders.findAll({ where: { fk_id_user:  user.dataValues.id } });
        var ordersArray = [];
        for (var order of orders){
            var instruments = await getOrdersInstrument(order);
            console.log(typeof(instruments));
            var address = await getAddress(order.dataValues);
            var total = getTotalPrice(instruments);
            var orderJSON = {
                bill: `http://127.0.0.1:3000/descargar/${order.dataValues.order_number}.pdf`,
                number: order.dataValues.order_number,
                date: order.dataValues.order_date,
                address,
                instruments,
                total
            }
            ordersArray.push(orderJSON)
        }
        return ordersArray;
    }

}
module.exports = order