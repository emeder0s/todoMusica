const center = require("../controllers/centers.controllers");
const instrument = require("../controllers/instruments.controllers");
const admin = require("../controllers/admin.controllers");
const user = require("../controllers/users.controllers");
const _class = require("../controllers/classes.controllers");
const order = require("../controllers/order.controllers")
const jwt = require("jsonwebtoken");

const pages = {
    /**
     * Renderiza la home
     * @param {json} req 
     * @param {json} res 
     */
    home: (req, res) => {
           res.render("./index.ejs");
    },

    /**
     * Renderiza la página de matriculación
     * @param {json} req 
     * @param {json} res 
     */
    startEnroll: async (req, res) => {
        var centers = await center.getAll();
        var instruments = ["Guitarra", "Piano", "Clarinete", "Violín", "Percusión"];
        res.render("./enroll.ejs", { centers, instruments });
    },
        
    /**
     * Renderiza la página para cambiar de contraseña
     * @param {json} req 
     * @param {json} res 
     */
    newPassword: (req, res) => {
        res.render("./newPass.ejs");
    },
        
    /**
     * Renderiza la página que te cambia de contraseña
     * @param {json} req 
     * @param {json} res 
     */
    forgetPass: (req, res) => {
        res.render("./forgetPass.ejs");
    },
        
    /**
     * Renderiza la página con la que el usuario inserta una dirección
     * @param {json} req 
     * @param {json} res 
     */
    insertAddress: (req, res) => {
        res.render("./address.ejs")
    },
        
    /**
     * Renderiza la página de registro
     * @param {json} req 
     * @param {json} res 
     */
    signin: (req,res)=>{
        res.render("./signin.ejs")
    },
        
    /**
     * Renderiza la página de login de usuario
     * @param {json} req 
     * @param {json} res 
     */
    login: (req,res)=>{
        res.render("./login.ejs")

    },
        
    /**
     * Renderiza la página del login del administrador
     * @param {json} req 
     * @param {json} res 
     */
    loginAdmin: (req,res)=>{
        res.render("./login_admin.ejs");
    },
        
    /**
     * Renderiza la página del dashboard del adminsitrado si está logueado
     * @param {json} req 
     * @param {json} res 
     */
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
        
    /**
     * Renderiza la página del formulario de contacto
     * @param {json} req 
     * @param {json} res 
     */
    contact: (req,res)=>{
        res.render("./contact.ejs")
    },
        
    /**
     * Renderiza la página con los instrumentos
     * @param {json} req 
     * @param {json} res 
     */
    instruments: (req,res)=>{
        res.render("./instrumentos.ejs")
    },
        
    /**
     * Renderiza la página del proceso de compra: elegir dirección de envio y pago
     * @param {json} req 
     * @param {json} res 
     */
    compra: (req,res)=>{
        res.render("./compra.ejs")
    },
        
    /**
     * Renderiza el mapa
     * @param {json} req 
     * @param {json} res 
     */
    showmap: (req,res)=>{
        res.render("./map.ejs")
    },
        
    /**
     * Renderiza el pago
     * @param {json} req 
     * @param {json} res 
     */
    pay: (req,res)=>{
        res.render("./pago.pug", {id_order: req.params.id_order})
    },
    
    /**
     * Renderiza la página de confirmación de envio de solicitud de matriculación
     * @param {json} req 
     * @param {json} res 
     */
    sentEnrollRequest: (req,res)=>{
        res.render("./sentEnrollRequest.ejs")
    },
    
    /**
     * Renderiza la página del perfil de usuario
     * @param {json} req 
     * @param {json} res 
     */
    userAccount:(req, res) => {
        res.render("./userAccount.ejs")
    },
    
    /**
     * Renderiza la página de confirmación de pedido
     * @param {json} req 
     * @param {json} res 
     */
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
    
    /**
     * Renderiza la página del perfil de usuario con las clases matriculadas
     * @param {json} req 
     * @param {json} res 
     */
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
    
    /**
     * Renderiza la página del perfil de usuario con los pedidos realizados
     * @param {json} req 
     * @param {json} res 
     */
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
        }
    },
    
    /**
     * Renderiza la página de edición de datos personales y dirección de usuario
     * @param {json} req 
     * @param {json} res 
     */
    profile: async (req, res) => {
        res.render("./profile.ejs")
    }
};

module.exports = pages;