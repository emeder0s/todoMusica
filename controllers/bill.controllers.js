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
    to_pdf: async (req, res) => {
        try {
            var order = await Orders.findOne({ where: { "id": req.body.order } })
            console.log(order)
            var orders_instruments = await Orders_Instruments.findAll({ where: { "fk_id_order": req.body.order } })
            console.log(orders_instruments)

            let tabla = "";
            let subtotal = 0;
            for (const producto of orders_instruments) {
                let instrument = await Instruments.findOne({where:{"id": producto.dataValues.fk_id_instrument}})
                console.log(instrument)
                const totalProducto = producto.dataValues.qty_instrument * instrument.dataValues.precio;
                subtotal += totalProducto;
                // Y concatenar los productos
/*                 tabla += `<tr>
     <td>${producto.descripcion}</td>
     <td>${producto.cantidad}</td>
     <td>${producto.precio + " €"}</td>
     <td>${totalProducto + " €"}</td>
     </tr>`; */
            }
            const descuento = 0;
            const subtotalConDescuento = subtotal - descuento;
            const impuestos = subtotalConDescuento * 0.21
            const total = subtotalConDescuento + impuestos;
            // Remplazar el valor {{tablaProductos}} por el verdadero valor
            var order_date = "22/11/2022";
            var user_name = "Fulano Mengano"
            var order_number = "La100001"
            contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
            contenidoHtml = contenidoHtml.replace("{{NumeroDeOrden}}", order_number);
            contenidoHtml = contenidoHtml.replace("{{nombreCliente}}", user_name);
            contenidoHtml = contenidoHtml.replace("{{Fecha}}", order_date);

            // Y también los otros valores

            contenidoHtml = contenidoHtml.replace("{{subtotal}}", subtotal + " €");
            contenidoHtml = contenidoHtml.replace("{{descuento}}", descuento + " €");
            contenidoHtml = contenidoHtml.replace("{{subtotalConDescuento}}", subtotalConDescuento + " €");
            contenidoHtml = contenidoHtml.replace("{{impuestos}}", impuestos + " €");
            contenidoHtml = contenidoHtml.replace("{{total}}", total + " €");
            pdf.create(contenidoHtml).toFile("salida.pdf", (error) => {
                if (error) {
                    console.log("Error creando PDF: " + error)
                } else {
                    console.log("PDF creado correctamente");
                }
            });
            res.json({order, orders_instruments})
        } catch (error) { res.json(error)}
    },
    to_email: async (req, res) => {
        var order = await Orders.findOne({ where: { "id": req.body.order } })
        console.log(order)
        var orders_instruments = await Orders_Instruments.findAll({ where: { "fk_id_order": req.body.order } })
        console.log(orders_instruments)
        /*  producto: {
              descripcion: "Nintendo Switch",
              cantidad: 2,
              precio: 9000,
          } */
        const productos = [];
        let tabla = "";
        let subtotal = 0;
        for (const producto of productos) {
            // Aumentar el total
            const totalProducto = producto.cantidad * producto.precio;
            subtotal += totalProducto;
            // Y concatenar los productos
            tabla += `<tr>
         <td>${producto.descripcion}</td>
         <td>${producto.cantidad}</td>
         <td>${producto.precio + " €"}</td>
         <td>${totalProducto + " €"}</td>
         </tr>`;
        }
        const descuento = 0;
        const subtotalConDescuento = subtotal - descuento;
        const impuestos = subtotalConDescuento * 0.21
        const total = subtotalConDescuento + impuestos;
        // Remplazar el valor {{tablaProductos}} por el verdadero valor
        var order_date = "22/11/2022";
        var user_name = "Fulano Mengano"
        var order_number = "La100001"
        contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
        contenidoHtml = contenidoHtml.replace("{{NumeroDeOrden}}", order_number);
        contenidoHtml = contenidoHtml.replace("{{nombreCliente}}", user_name);
        contenidoHtml = contenidoHtml.replace("{{Fecha}}", order_date);

        // Y también los otros valores

        contenidoHtml = contenidoHtml.replace("{{subtotal}}", subtotal + " €");
        contenidoHtml = contenidoHtml.replace("{{descuento}}", descuento + " €");
        contenidoHtml = contenidoHtml.replace("{{subtotalConDescuento}}", subtotalConDescuento + " €");
        contenidoHtml = contenidoHtml.replace("{{impuestos}}", impuestos + " €");
        contenidoHtml = contenidoHtml.replace("{{total}}", total + " €");
        pdf.create(contenidoHtml).toStream((error, stream) => {
            if (error) {
                res.end("Error creando PDF: " + error)
            } else {
                res.setHeader("Content-Type", "application/pdf");
                stream.pipe(res);
            }
        });
    }
}
module.exports = bill



