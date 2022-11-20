const center = require("../controllers/centers.controllers");
const instrument = require("../controllers/instruments.controllers")
const admin = require("../controllers/admin.controllers")

const pages = {
    home: (req, res) => {
        //   res.render("index");
    },

    startEnroll: async (req, res) => {
        var centers = await center.getAll();
        var instruments = ["Guitarra", "Piano", "Clarinete", "Violín", "Percusión"];
        res.render("./enroll.ejs", { centers, instruments });
    },
    newPassword: (req, res) => {
        console.log("vamos a paginapasword")
        res.render("./newPass.ejs");
    },
    forgetPass: (req, res) => {
        console.log("vamos a recovery")
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

    }

};

module.exports = pages;