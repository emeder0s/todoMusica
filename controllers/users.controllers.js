const Users = require("../models/user.model");
const Address = require("../models/address.model");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const user = {
  findAll: async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
  },
  /**
   * Registra un usuario en la base de datos, Encripta la contraseña.
   * @param {*} req 
   * @param {*} res 
   */
  register: async (req, res) => {
    try {
      const { first_name, last_name, dni, email, phone, birth_date, user_password } = req.body;
      console.log(req.body)
      const user_password_hash = await bcyptjs.hash(user_password, 8);
      const user = await Users.create({ first_name, last_name, dni, email, phone, birth_date, "user_password": user_password_hash })
      res.json("ok");
    } catch (ValidationError) {
      res.json("Email o DNI repetido");
    }
  },
  /**
   * Función que inserta una dirección en la base de datos e incluye su id en el campo del usuario que la inserta.
   * @param {*} req 
   * @param {*} res 
   */
  set_address: async (req, res) => {
    var logged = await user.isAuthorized(req, res);
    try {
      let email = logged.email;
      if (logged) {
        const { way_type, address, a_number, additional_address, locality, province, country, postal_code } = req.body;
        const user_address = await Address.create({ way_type, address, a_number, additional_address, locality, province, country, postal_code });
        let user = await Users.update({ "fk_id_address": user_address.id }, { where: { email } });
      }
    } catch (error) {
      res.json(error);
    }
  },
  /**
   * Funcion que comprueba email y contraseña de usuario para iniciar sesion, al comprobar que es correcto inserta una cookie en el navegador.
   * @param {*} req 
   * @param {*} res 
   */
  login: async (req, res) => {
    console.log(req.query.url);
    const { email, user_password } = req.body;
    const user = await Users.findOne({ where: { "email": req.body.email } });
    let hashSaved = user.dataValues.user_password;
    let compare = bcyptjs.compareSync(user_password, hashSaved);
    const infoJwt = jwt.sign({ email }, "m1c4s4", {
      expiresIn: "1800s",
    });
    if (compare) {
      res.cookie("infoJwt", infoJwt);
      res.json("ok");
    } else {
      res.json("no ok");
    }
  },
  /**
   * Funcion que devuelve un Json Web Token que contiene la dirección de email del usuario para comprobar la identidad al cambiar la contraseña.
   * @param {*} req 
   * @param {*} res 
   */
  getUser: async (req, res) => {
    const { email } = req.body;
    const infoUser = await Users.findOne({ where: { "email": req.body.email } });
    if (infoUser) {
      const infoJwt = jwt.sign({ email }, "m1c4s4", {
        expiresIn: "1000s",
      });
      sendemail.passrequest(infoJwt, email);
      res.json(infoJwt);
    } else {
      res.json(false);
    }
  },

  /**
   * Verifica la validez del json web token, recoge la nueva contraseña introducida por el usuario y la actualiza en la base de datos.
   * @param {*} req 
   * @param {*} res 
   */
  verificar: async (req, res) => {
    let { token, password } = req.body;
    try {
      // Verifica el token donde está el email del usuario
      let jwtVerify = jwt.verify(token, "m1c4s4");
      let email = jwtVerify.email;
      var user_password = await bcyptjs.hash(password, 8);
      const infoUser = await Users.update({ user_password }, { where: { email } });
      sendemail.passconfirm(email);
      res.json(true);
    } catch (error) {
      res.json(false);
    }
  },
  /**
   * Borra a un usuario de la base de datos. Para realizar esta operación el usuario debe confirmar su identidad introduciendo sus credenciales.
   * @param {*} req 
   * @param {*} res 
   */
  delete: async (req, res) => {
    const { email, user_password } = req.body;
    const user = await Users.findOne({ email })
    let hashSaved = user.dataValues.user_password;
    let compare = bcyptjs.compareSync(user_password, hashSaved);
    if (compare) {
      user.destroy();
      res.json("Usuario Borrado")
    } else {
      res.json("no ok")
    }
  },

  /**
   * Función que actualiza el campo isbuyer en la BD del usuario.
   * @param {*} req 
   * @param {*} res 
   */
  isbuyer: async (req, res) => {
    try {
      var logged = await user.isAuthorized(req, res);
      let email = logged.email;
      if (logged) {
        let isbuyer = 1
        const infoUser = await Users.update({ isbuyer }, { where: { email } });
      }
    }
    catch (error) {
      res.json(false);
    }
  },

  /**
   * Función que recoge los datos de contacto y envia los emails tanto al usuario con el feedback como al administrador con el contenido del mensaje.
   * @param {*} req 
   * @param {*} res 
   */
  contact: async (req, res) => {
    const { first_name, last_name, email, text } = req.body;
    sendemail.contact(first_name, last_name, email, text);
    sendemail.contactfeedback(first_name, email);
    res.render("./sentContactForm.ejs")
  },

  /**
   * Función que comprueba que un usuario tiene la sesion iniciada recogiendo el Json web token de las cookies.
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  isAuthorized: (req, res) => {
    var cookies = req.cookies;
    var token = cookies.infoJwt;
    try {
      let jwtVerify = jwt.verify(token, "m1c4s4")
      res.json(jwtVerify)
      return jwtVerify
    } catch (error) {
      res.json("Usuario no loggeado")
    }
  },
  /**
   * Funcion que devuelve un usuario que se busca por su email.
   * @param {*} req
   * @param {*} res
   */

  returnUserByEmail: async (email) => {
    return await Users.findOne({ where: { "email": email } });
  },

  /**    
   * @param {*} req 
   * @param {*} res 
   */
  getUserByEmail: async (req, res) => {
    res.json(await Users.findOne({ where: { "email": req.body.email } }));
  },

  logout: (req, res) => {
    var cookies = req.cookies;
    if (cookies) {
      var token = cookies.infoJwt;
      res.json(token);
    }
  }

}

module.exports = user;