var nodemailer = require('nodemailer');
const Users = require("../models/user.model");
const fs = require("fs")
const path = require("path")
const smtpConfig = {
  host: 'smtp.ionos.es',
  port: 587,
  secure: false,
  auth: {
    user: "info@suricatoav.es",
    pass: "xxxxxxxxxx"
  }
};
const transporter = nodemailer.createTransport(smtpConfig);

const email = {
  /**
   * Envia un correo electrónico con el enlace de recuperación de contraseña
   * @param {string} infoJwt - json web token generado con el email del usuario
   * @param {string} user_email - dirección de email del usuario que ha solicitado la contraseña.
   */
  passrequest: async (infoJwt, user_email) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com',
      to: user_email,
      subject: 'Cambio de contraseña: Comprobacion de identidad',
      text: "",
      html: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                <h1>Recuperación de contraseña:</h1>
                <h3>TodoMúsica</h3>
                <p>Has solicitado el cambio de contraseña para tu usuario, <a href="http://127.0.0.1:3000/forgetpassword/${infoJwt}">haz click Aqui</a> para establecer una nueva.</p>
                <p>Si no has solicitado el cambio de contraseña, ignora este mensaje.</p>
                <p>Gracias por confiar en TodoMúsica.</p>
              </body>
            </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    });

  },
/**
 * Envia un email de confirmación de cambio de contraseña.
 * @param {string} user_email - dirección de email del usuario.
 */
  passconfirm: async (user_email) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com',
      to: user_email,
      subject: 'Confirmación de cambio de contraseña',
      text: "",
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>Confirmación de contraseña:</h1>
              <h3>TodoMúsica</h3>
              <p>El cambio de contraseña se ha realizado con éxito. Si no recuerdas haber hecho este cambio puedes <a href="http://127.0.0.1:3000/passrecovery">Recuperar tu contraseña.</a></p>
              <p>Gracias por confiar en TodoMúsica.</p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    });
  },
  neworder: (req, res) => {

  },

  /**
   * Envia por email la factura correspondiente a un pedido.
   * @param {string} user_email - Email del usuario.
   * @param {string} first_name - Nombre del usuario.
   * @param {string} order_number - Número de pedido.
   * @param {string} order_date - Fecha del pedido.
   */
  invoice: (user_email, first_name, order_number, order_date) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com' ,
      to: user_email,
      subject: `Confirmación de pedido y factura: ${order_number}`,
      text: "",
      attachments: [{
        filename: `${order_number}.pdf`,
        path: `./pdf_pedidos/${order_number}.pdf`,
      }],
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
            <h2>TodoMúsica/h2>
              <h1>En marcha!</h1>
              <h4>Muchas gracias ${first_name}!!<h4>
              <p>Hemos procesado su solicitud del pedido: ${order_number} con fecha ${order_date} y estamos trabajando para enviarlo lo antes posible.
              <p>Puedes encontrar tu factura adjunta en este Email. Si lo deseas tambien puedes descargarla desde <a href="http://127.0.0.1:3000/descargar/${order_number}.pdf">Este enlace</a></p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted + " Factura enviada")
      }
      return info
    })
  },
  classconfirm: (req, res) => {

  },
  /**
   * Envia un email al administrador con el mensaje y los datos del usuario que solicita contacto
   * @param {string} first_name - Nombre del usuario que solicita contacto.
   * @param {string} last_name - Apellidos del usuario que solicita contacto.
   * @param {string} user_email - Email del usuario que solicita contacto.
   * @param {string} text - Mensaje de contacto.
   */
  contact: async (first_name, last_name, user_email, text) => {
    var mailOptions = {
      from: user_email ,
      to: 'todomusicathebridge@gmail.com',
      subject: `Contacto: ${first_name + " " + last_name}`,
      text: "",
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>Mensaje de usuario:</h1>
              <p>${text}</p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    })
  },
  /**
   * Envia un email confirmando que la solicitud de contacto ha sido recibida.
   * @param {string} first_name - Nombre del usuario que solicita contacto.
   * @param {string} user_email - Email del usuario que solicita contacto.
   */
  contactfeedback: async (first_name, user_email) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com',
      to: user_email,
      subject: 'Contacto',
      text: "",
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>Gracias por contactar con TodoMúsica.</h1>
              <p>Hola ${first_name}. Hemos recibido tu solicitud de contacto. En breve recibirás una respuesta.</p>
              <p>Gracias por confiar en TodoMúsica.</p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    })
  },

  /**
   * Envía un email al usuario cuando se ha aceptado su solicitud de matrícula
   * @param {string} user_email 
   * @param {json} _class 
   * @param {json} _center 
   */
  enrollRequestAccepted: async (user_email,_class,_center) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com',
      to: user_email,
      subject: 'Resultado de solicitud de matriculación',
      text: "",
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>¡Felicidades! - Ha sido ACEPTADO</h1>
              <h3>TodoMúsica</h3>
              <p>Nos complace comunicarle que ha sido aceptado en la clase de ${_class.instrument} - ${_class.schedule}</p>
              <p>Para terminar el proceso de matriculación deberá ponerse en contacto con el centro donde se imparten sus clases para que le expliquen las opciones de pago:</p>
              <p>Centro: ${_center.center_name} </p>
              <p>Telefono: ${_center.phone_number} </p>
              <p>Gracias por confiar en TodoMúsica.</p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    });
  },
 /**
   * Envía un email al usuario cuando se ha rechazado su solicitud de matrícula
   * @param {string} user_email 
   * @param {json} _class 
   * @param {json} _center 
   */
  enrollRequestRejected: async (user_email,_class,_center) => {
    var mailOptions = {
      from: 'todomusicathebridge@gmail.com',
      to: user_email,
      subject: 'Resultado de solicitud de matriculación',
      text: "",
      html: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>Lo sentimos - No ha sido aceptado</h1>
              <h3>TodoMúsica</h3>
              <p>Lamentamos comunicarle que no ha sido aceptado en la clase de ${_class.instrument} - ${_class.schedule} en el centro  ${_center.center_name}</p>
              <p>Gracias por confiar en TodoMúsica.</p>
            </body>
          </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
      return info
    });
  },
};

module.exports = email;




