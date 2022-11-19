const Users = require("../models/user.model");
const Address = require("../models/address.model");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const User = {
  findAll: async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
  },
  register: async (req, res) => {
    const { first_name, last_name, dni, email, phone, birth_date, user_password } = req.body;
    console.log(req.body)
    const user_password_hash = await bcyptjs.hash(user_password, 8);
    const user = await Users.create({ first_name, last_name, dni, email, phone, birth_date, "user_password": user_password_hash })
    res.send("Usuario registrado")
  },
  set_address: async (req, res) => {
    var cookies = req.cookies;
    var token = cookies.infoJwt;
    try {
      let jwtVerify = jwt.verify(token, "m1c4s4")
      let email = jwtVerify.email;
      if (jwtVerify) {
        const { way_type, address, a_number, additional_address, locality, province, country, postal_code } = req.body;
        const user_address = await Address.create({ way_type, address, a_number, additional_address, locality, province, country, postal_code });
        let user = await Users.update({ "fk_id_address": user_address.id }, { where: { email } })
        res.json({ way_type, address, a_number, additional_address, locality, province, country, postal_code, cookies })
      }
    }
    catch (error) {
      res.json(error)
    }
  },
  login: async (req, res) => {
    const { email, user_password } = req.body;
    console.log(req.body)
    const user = await Users.findOne({ where: { "email": req.body.email } })
    console.log(user.dataValues)
    let hashSaved = user.dataValues.user_password;
    let compare = bcyptjs.compareSync(user_password, hashSaved);
    const infoJwt = jwt.sign({ email }, "m1c4s4", {
      expiresIn: "1800s",
    });
    if (compare) {
      res.cookie("infoJwt", infoJwt).send('Cookie is set');
    } else {
      res.json("no ok")
    }
  },
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
  isbuyer: async (req, res) => {
    try {
      var logged = await isAuthorized(req, res);
      let email = logged.email;
      if (logged) {
        let isbuyer = 1
        const infoUser = await Users.update({ isbuyer }, { where: { email } });
        res.json(true)
      }
    }
    catch (error) {
      res.json(false);
    }
  },
  contact: async (req, res) => {
    const{first_name, last_name, email, text } = req.body;
    console.log(req.body)

    sendemail.contact(first_name,last_name,email,text);
    sendemail.contactfeedback(first_name, email);
    res.alert("Contacto realizado con éxito")}
,
}
async function isAuthorized(req, res) {
  var cookies = req.cookies;
  var token = cookies.infoJwt;
  let jwtVerify = jwt.verify(token, "m1c4s4")
  let email = jwtVerify.email;
  if (jwtVerify) {
    return jwtVerify
  } else {
    res.json("Usuario no loggeado")
  }
}
module.exports = User;