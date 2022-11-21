const Users = require("../models/user.model");
const Address = require("../models/address.model");
const Orders = require("../models/order.model");
const Orders_Instruments = require("../models/order_instrument.model");

const pdf = require("html-pdf");
const fs = require("fs");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const Instruments = require("../models/instrument.model");

const ubicacionPlantilla = require.resolve("../views/plantillas/factura.html");
let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8')

const bill = {
    /**
     * Función que genera la factura de un pedido en formato pdf y la envia por correo electronico al usuario.
     * @param {*} req 
     * @param {*} res 
     */
    to_pdf: async (req, res) => {
        try {

            //Consultamos la id de la orden de la que queremos generar el pedido.
            var order = await Orders.findOne({ where: { "id": req.body.order } })
            //Consultamos la cantidad de cada instrumento que está en el pedido.
            var orders_instruments = await Orders_Instruments.findAll({ where: { "fk_id_order": req.body.order } })
            //Generamos las filas con los datos (modelo, cantidad y precio) de cada instrumento.
            let tabla = "";
            let subtotal = 0;
            for await (var producto of orders_instruments) {
                let instrument = await Instruments.findOne({ where: { "id": producto.dataValues.fk_id_instrument } })
                let price = instrument.dataValues.price
                let nprice = parseInt(price.split(" ")[0])
                const totalProducto = producto.dataValues.qty_instrument * nprice;
                console.log("Precio Unitario: " + nprice)
                subtotal += totalProducto;
                
                // Y concatenar los productos
                tabla += `<tr>
                <td>${instrument.dataValues.model}</td>
                <td>${producto.dataValues.qty_instrument}</td>
                <td>${nprice + " €"}</td>
                <td>${totalProducto + " €"}</td>
                </tr>`;
            }
            //Declaramos las variables que se van a insertar en la plantilla HTML.
            const descuento = 0;
            const subtotalConDescuento = subtotal - descuento;
            const impuestos = subtotalConDescuento * 0.21
            const total = subtotalConDescuento + impuestos;
            var order_date = order.dataValues.order_date;
            var order_number = order.dataValues.order_number

            //Busca los datos del usuario.
            var user = await Users.findOne({ where: { "id": order.dataValues.fk_id_user } })
            var user_name = user.dataValues.first_name + " " + user.dataValues.last_name
            var email = user.dataValues.email
            var phone_number = user.dataValues.phone
            var dni = user.dataValues.dni

            //Busca la dirección del usuario que hay registrada en la base de datos.
            var userAddress = "N/A"
            if(user.dataValues.fk_id_address){
            var reqUserAddress = await Address.findOne({ where: { "id": user.dataValues.fk_id_address } })
            var userAddressv = reqUserAddress.dataValues
            var userAddress = `${userAddressv.way_type}/ ${userAddressv.address}, ${userAddressv.a_number}, ${userAddressv.additional_address}. ${userAddressv.locality + " " + userAddressv.province + " " + userAddressv.postal_code + " " + userAddressv.country}`    
            }

            //Busca la dirección de envio solicitada en el pedido.
            if(order.dataValues.fk_id_address){
                var orderAddress = await Address.findOne({ where: { "id": order.dataValues.fk_id_address } })
                var addressv = orderAddress.dataValues
                var finalAddress = `${addressv.way_type}/ ${addressv.address}, ${addressv.a_number}, ${addressv.additional_address}. ${addressv.locality + " " + addressv.province + " " + addressv.postal_code + " " + addressv.country}`    
            }
           else{ 
               var finalAddress = order.dataValues.pickup_address
            }
            

            //Insertamos las variables en la plantilla:
            contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
            contenidoHtml = contenidoHtml.replace("{{NumeroDeOrden}}", order_number);
            contenidoHtml = contenidoHtml.replace("{{nombreCliente}}", user_name);
            contenidoHtml = contenidoHtml.replace("{{direccion}}", userAddress);
            contenidoHtml = contenidoHtml.replace("{{direccionEnvio}}", finalAddress);
            contenidoHtml = contenidoHtml.replace("{{email}}", email);
            contenidoHtml = contenidoHtml.replace("{{dni}}", dni);
            contenidoHtml = contenidoHtml.replace("{{telefono}}", phone_number);
            contenidoHtml = contenidoHtml.replace("{{Fecha}}", order_date);
            contenidoHtml = contenidoHtml.replace("{{subtotal}}", subtotal + " €");
            contenidoHtml = contenidoHtml.replace("{{descuento}}", descuento + " €");
            contenidoHtml = contenidoHtml.replace("{{subtotalConDescuento}}", subtotalConDescuento + " €");
            contenidoHtml = contenidoHtml.replace("{{impuestos}}", impuestos + " €");
            contenidoHtml = contenidoHtml.replace("{{total}}", total + " €");

            //Generamos el archivo pdf.
            pdf.create(contenidoHtml).toFile(`./pdf_pedidos/${order_number}.pdf`, (error) => {
                if (error) {
                    console.log("Error creando PDF: " + error)
                } else {
                    console.log("PDF creado correctamente");
                    //Enviamos el archivo via email pasando los parametros necesarios.
                    sendemail.invoice(email, user_name, order_number, order_date)
                }
            });
            
            res.json({ order, orders_instruments })
        } catch (error) { res.json(error) }
    },
    /**
     * Funcion que permite descargar el archivo pdf con la factura que se haya solicitado.
     * @param {*} req 
     * @param {*} res 
     */
    billdownload: (req,res)=>{
        res.download(__dirname + `/../pdf_pedidos/` + req.params.file, 
        req.params.file, function(err){
            if (err){
                console.log(err)
            }else{console.log("bien")}
        })
    }
}
module.exports = bill



