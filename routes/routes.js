const router = require("express").Router();
const instrument = require("../controllers/instruments.controllers")
const _class = require("../controllers/classes.controllers");
const user = require("../controllers/users.controllers")
const _admin = require("../controllers/admin.controllers");
const _center = require("../controllers/centers.controllers");
const pages = require("../controllers/pages.controllers");
const enrollRequest = require("../controllers/enroll.request.controllers");
const address = require("../controllers/address.controllers");

const bill = require("../controllers/bill.controllers")

const order = require("../controllers/order.controllers");
const order_instrument = require("../controllers/orders_instruments.controllers");



//PAGES
router.get("/", pages.home);//pagina de inicio
router.get("/select-center-instrument",pages.startEnroll);//pagina para seleccionar el centro y el instrumento de las clases a mostrar
router.get("/signin", pages.signin) //pagina del registro de usuario
router.get("/address", pages.insertAddress)// pagina registro de direccion
router.get("/passrecovery", pages.forgetPass) //Pagina para recuperar contraseña
router.get("/forgetpassword/:infoJwt", pages.newPassword) //Pagina para establecer la nueva contraseña
router.get("/login", pages.login) //Pagina que muestra el formulario de login
router.get("/login-admin", pages.loginAdmin) //Pagina que muestra el formulario de login del administrador
router.get("/contact", pages.contact)//Formulario de contacto
router.get("/dashboard", pages.dashboard)//Formulario de contacto
router.get("/instruments", pages.instruments)//Vista de los intrumentos 
router.get("/compra", pages.compra)//Pagina que comienza el proceso de compra
router.get("/map", pages.showmap)
router.get("/pay/:id_order", pages.pay)
router.get("/user-account",pages.userAccount)//página del perfil de usuario
router.get("/sendOrder",pages.sendOrder)
router.get("/user-classes",pages.userClasses)//página que muestra las clases matriculadas del usuario
router.get("/user-orders",pages.userOrder)//página que muestra las clases matriculadas del usuario
router.get("/profile", pages.profile)

//USER
router.post("/register", user.register); //funcion que inserta en users
router.get("/findAll", user.findAll) //funcion que muestra todos los usuarios
router.post("/login", user.login) // funcion que verifica el usuario y la contraseña. pone una cookie
router.post("/setAddress", user.set_address) // comprueba la cookie e inserta en BD la direccion
router.post("/getUser",user.getUser) //Funcion que devuelve el token con el usuario y el email.
router.post("/verificar", user.verificar) //funcion que verifica que un usuario es el que pide cambiar la contraseña
router.post("/delete", user.delete) // borra usuario
router.get("/isbuyer", user.isbuyer) //funcion que escribe en BD que el usuario ha hecho una compra
router.post("/contact", user.contact) //funcion que envia dos emails. uno al cliente y otro al centro de contacto
router.get("/isAuthorized", user.isAuthorized)//funcion que devuelve el token de la cookie para ver si el usuario tiene la sesion iniciada.
router.post("/getUserByEmail", user.getUserByEmail) //funcion que devuelve el usuario por su email
router.get("/logout", user.logout)// Deuelve el token del usuario para borrar la cookie en el front
router.post("/update", user.update)// Modifica los datos personales del usuario.

//CLASSES
router.get("/show-classes",_class.showAll);
router.get("/clases-estudiante/:id",_class.showByUser);
router.post("/matricularse/:idClass/:idUser",_class.enroll);
router.post("/selected-center-instrument",_class.getByCenterAndInstrument);
//router.get("/mostrar-por-instrumento/",_class.showByCenter);
//router.get("/mostrar-por-centros-y-instrumento/",_class.showByCenter);

//ADDRESS
router.post("/getAddress", address.findAdressById);
router.post("/createAddress", address.createAddress);

//BILL
router.post("/bill_pdf", bill.to_pdf)
router.get("/descargar/:file", bill.billdownload)

//ADMIN
router.post("/get-admin",_admin.login);
router.get("/is-admin-authorized",_admin.isAdminAuthorized);
router.post("/loginAsUser", _admin.loginAsUser)
router.get("/logout-admin", _admin.logout)// Deuelve el token del admin para borrar la cookie en el front




//INSTRUMENTS
router.get("/findInstruments", instrument.findInstruments);
router.post("/findCategory", instrument.findByCategory);

//ENROLL REQUEST
router.post("/send-enroll-request/:classId",enrollRequest.add);
router.get("/get-all-requests",enrollRequest.getAll);
router.get("/send-request",enrollRequest.sendRequest);

//ORDER
router.post("/new_order_address", order.new_order_address);
router.post("/new_order_pickup", order.new_order_pickup);

//ORDER INSTRUMENTS
router.post("/new_order_instru", order_instrument.new_order_instru);

module.exports = router;
