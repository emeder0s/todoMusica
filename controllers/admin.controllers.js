const mongoose = require("../databases/mongo.js");
const AdminModel = require("../models/admin.model.js");
const Users = require("../models/user.model");
const userController = require("../controllers/users.controllers");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const _admin = {
    /**
     * Login del administrador
     * @param {JSON} req 
     * @param {JSON} res 
     */
    login: async (req, res) => {
        const { user, password } = req.body;
        await mongoose.conn();
        var admin = await AdminModel.findOne({ admin: user });
        if (admin) {
            if (admin.password == password && admin.admin == user) {
                const infoJwt = jwt.sign({ admin }, "m1m0t0", {
                    expiresIn: "1800s",
                });
                res.cookie("infoJwt", infoJwt).json("./dashboard");
            } else {
                res.json(false);
            }
        } else {
            res.send(false);
        }
    },

    /**
     * Comprueba si el adinistrador está logueado o no 
     * @param {JSON} req 
     * @param {JSON} res 
     */
    isAdminAuthorized: (req, res) => {
        var cookies = req.cookies;
        if (cookies) {
            var token = cookies.infoJwt;
            try {
                let jwtVerify = jwt.verify(token, "m1m0t0")
                res.json(true)
            } catch (error) {
                res.json(false)
            }
        }
    },
    /**
     * Función que permite al Admin actuar como si fuera un usuario a partir de su dirección de email.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    loginAsUser: async (req, res) => {
        const { email } = req.body;
        const user = await Users.findOne({ where: { "email": req.body.email } });
        const infoJwt = jwt.sign({ email }, "m1c4s4", {
            expiresIn: "1800s",
        });
        if (user) {
            res.cookie("infoJwt", infoJwt);
            res.json("ok")
        } else {
            res.json("no ok")
        }
    },


      /**
   * Log out del admin - limpia la cookie con el json web token del navegador
   * @param {json} req 
   * @param {json} res 
   */
  logout: (req, res) => {
    var cookies = req.cookies;
    if (cookies) {
      var token = cookies.infoJwt;
      res.json(token);

    }
}}


module.exports = _admin;