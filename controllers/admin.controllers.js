const mongoose = require("../databases/mongo.js");
const AdminModel = require("../models/admin.model.js");
const jwt = require("jsonwebtoken");

const _admin = {
    /**
     * Login del administrador
     * @param {*} req 
     * @param {*} res 
     */
    login:  async (req, res) => {
        const { user, password } = req.body;
        console.log(user);
        console.log(password);
        await mongoose.conn();
        var admin = await AdminModel.findOne({admin:user});
        if (admin){
            if (admin.password == password && admin.admin == user){
                const infoJwt = jwt.sign({ admin }, "m1c4s4", {
                    expiresIn: "1800s",
                });
                res.cookie("infoJwt", infoJwt).json("./dashboard"); 
            }else{
                res.json(false);
            }    
        } else {
            res.send(false);
        }
    }
}

module.exports = _admin;