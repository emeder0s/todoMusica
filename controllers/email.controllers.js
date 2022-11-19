var nodemailer = require('nodemailer');
const Users = require("../models/user.model");
const smtpConfig = {
  host: 'smtp.ionos.es',
  port: 587,
  secure: false,
  auth: {
    user: "info@suricatoav.es",
    pass: "etiketass"
  }
};
const transporter = nodemailer.createTransport(smtpConfig);

const email = {
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
  invoice: (req, res) => {

  },
  classconfirm: (req, res) => {

  },
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
  }
};

module.exports = email;




