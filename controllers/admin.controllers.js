const mongoose = require("../databases/mongo.js");
const AdminModel = require("../models/admin.model.js");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const _admin = {
    /**
     * Login del administrador
     * @param {*} req 
     * @param {*} res 
     */
    login:  async (req, res) => {
        const { user, password } = req.body;
        await mongoose.conn();
        var admin = await AdminModel.findOne({admin:user});
        if (admin){
            if (admin.password == password && admin.admin == user){
                const infoJwt = jwt.sign({ admin }, "m1m0t0", {
                    expiresIn: "1800s",
                });
                res.cookie("infoJwt", infoJwt).json("./dashboard"); 
            }else{
                res.json(false);
            }    
        } else {
            res.send(false);
        }
    },

    /**
     * Función que comprueba que un admin tiene la sesion iniciada recogiendo el Json web token de las cookies.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    isAdminAuthorized: (req) =>{
        var cookie = req.cookies;
        if (JSON.stringify(cookie) === "{}") {
           return false;
            
        }else{
            return true
        }
     }
}


module.exports = _admin;