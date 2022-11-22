const center = require("../controllers/centers.controllers");
const instrument = require("../controllers/instruments.controllers");
const admin = require("../controllers/admin.controllers");
const user = require("../controllers/users.controllers");
const _class = require("../controllers/classes.controllers");
const order = require("../controllers/order.controllers")
const jwt = require("jsonwebtoken");

const pages = {
    home: (req, res) => {
           res.render("./index.ejs");
    },

    startEnroll: async (req, res) => {
        var centers = await center.getAll();
        var instruments = ["Guitarra", "Piano", "Clarinete", "Violín", "Percusión"];
        res.render("./enroll.ejs", { centers, instruments });
    },
    newPassword: (req, res) => {
        res.render("./newPass.ejs");
    },
    forgetPass: (req, res) => {
        res.render("./forgetPass.ejs");
    },
    insertAddress: (req, res) => {
        res.render("./address.ejs")
    },
    signin: (req,res)=>{
        res.render("./signin.ejs")
    },
    login: (req,res)=>{
        res.render("./login.ejs")

    },
    loginAdmin: (req,res)=>{
        res.render("./login_admin.ejs");
    },
    dashboard: (req,res)=>{
        var cookies = req.cookies;
        if(cookies){
            var token = cookies.infoJwt;
            try {
              let jwtVerify = jwt.verify(token, "m1m0t0");
              res.render("./dashboard.ejs");
            } catch (error) {
                res.status(403).send("403 - FORBIDDEN - No tienes permisos para acceder aquí");
            }
        }
    }, 
    contact: (req,res)=>{
        res.render("./contact.ejs")
    },

    instruments: (req,res)=>{
        res.render("./instrumentos.ejs")
    },
    
    compra: (req,res)=>{
        res.render("./compra.ejs")
    },
    
    showmap: (req,res)=>{
        res.render("./map.ejs")
    },
    
    pay: (req,res)=>{
        res.render("./pago.pug", {id_order: req.params.id_order})
    },

    sentEnrollRequest: (req,res)=>{
        res.render("./sentEnrollRequest.ejs")
    },

    userAccount:(req, res) => {
        res.render("./userAccount.ejs")
    },

    sendOrder: (req, res) => {
        res.render("./sendOrder.ejs")
        var cookies = req.cookies;
        if(cookies){
            var token = cookies.infoJwt;
            try {
              let jwtVerify = jwt.verify(token, "m1c4s4");
              res.render("./userAccount.ejs");
            } catch (error) {
              res.redirect('./login');
            }
        }
    },

    userClasses: async (req, res) => {
        var cookies = req.cookies;
        if(cookies){
            var token = cookies.infoJwt;
            try {
              let jwtVerify = jwt.verify(token, "m1c4s4");
              var classes = await _class.getByUser(token);
              res.render("./userClasses.ejs",{classes})
            } catch (error) {
                res.render("./login")
            }
        }
    },

    userOrder: async (req, res) => {
        var cookies = req.cookies;
        if(cookies){
            var token = cookies.infoJwt;
            try {
              let jwtVerify = jwt.verify(token, "m1c4s4");
              console.log(jwtVerify);
              var orders = await order.get_by_user(jwtVerify.email);
              res.render("./userOrders.ejs",{orders})
            } catch (error) {
                console.log(error);
                res.render("./login")
            }
        },

    profile: async (req, res) => {
        res.render("./profile.ejs")

    }
};

module.exports = pages;