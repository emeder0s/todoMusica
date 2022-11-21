const center = require("../controllers/centers.controllers");
const instrument = require("../controllers/instruments.controllers")
const admin = require("../controllers/admin.controllers")
const user = require("../controllers/users.controllers")

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
        res.render("./dashboard.ejs");
        // if(admin.isAdminAuthorized(req)){
        //     res.render("./dashboard.ejs");
        // }else{
        //     res.status(403).send("403 - FORBIDDEN - No tienes permisos para acceder aquí");
        // }   
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
    }
    
};

module.exports = pages;