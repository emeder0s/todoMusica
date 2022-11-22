const Orders = require("../models/order.model");
const OrdersInstruments = require("../models/order_instrument.model");
const Instruments = require("../models/instrument.model");
const _user = require("../controllers/users.controllers");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const address = require("./address.controllers");

/**
 * Calcula y devuelve el precio total de un pedido
 * @param {array} instruments 
 * @returns {string}
 */
function getTotalPrice(instruments){
    var total = 0;
    instruments.forEach(element => {
        var price = element.instrument.price;
        price = parseInt(price.split(" ")[0]);
        price = price * parseInt(element.quantity);
        total += price;
    })

    return total;
};

/**
 * Devuelve de dirección de envío de un pedido, dependiendo de si es un punto de recogida o un domicilio
 * @param {json} order 
 * @returns {json}
 */
async function getAddress(order){
    if(order.pickup_address){
        return order.pickup_address;
    }else{
        var orderAddress = await address.returnAddressById(order.fk_id_address);
       var addressv = orderAddress.dataValues
       var finalAddress = `${addressv.way_type}/ ${addressv.address}, ${addressv.a_number}, ${addressv.additional_address}. ${addressv.locality + " " + addressv.province + " " + addressv.postal_code + " " + addressv.country}`    
   
        return finalAddress
    }
};

/**
 * Devuelve un array de jsons con los instrumentos de un pedido y la cantidad de cada uno de ellos. 
 * @param {array} orders_instruments 
 * @returns {array}
 */
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
};

/**
 * Busca todos los elementos de la tabla order_instruments que pertenezcan al pedido para luego poder buscar los instrumentos del mismo y devolverlos
 * @param {json} order 
 * @returns {array}
 */
async function getOrdersInstrument(order){
    var orders_instrument = await OrdersInstruments.findAll({ where: { fk_id_order: order.dataValues.id } });
    var instruments = await getInstruments(orders_instrument);
    return instruments;
};

const order = {
    /**
     * Inserta un registro en la tabla orders de la base de datos, el cual
     * tiene los datos de una orden con un punto de recogida. (el campo fk_id_address esta vacio)
     * @param {json} req 
     * @param {json} res 
     */
    new_order_pickup: async (req,res)=>{
        const { pickup_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ pickup_address, order_number, fk_id_user }));
    },    

    /**
     * Inserta un registro en la tabla orders de la base de datos, el cual
     * tiene los datos de una orden que se envia a domicilio (el campo pickup_address esta vacio)
     * @param {json} req 
     * @param {json} res 
     */
    new_order_address: async (req,res)=>{
        const { fk_id_address, order_number, fk_id_user} = req.body;
        res.send(await Orders.create({ fk_id_address, order_number, fk_id_user }));
    },

    /**
     * Prepara una json con los datos de los pedidos que ha realizado un usuario.
     * @param {string} email 
     * @returns {json}
     */
    get_by_user: async (email) => {
        var user =   await _user.returnUserByEmail(email);
        var orders = await Orders.findAll({ where: { fk_id_user:  user.dataValues.id } });
        var ordersArray = [];
        for (var order of orders){
            var instruments = await getOrdersInstrument(order);
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