const router = require("express").Router();
const instrument = require("../controllers/instruments.controllers")
const _class = require("../controllers/classes.controllers");
const user = require("../controllers/users.controllers")
const _admin = require("../controllers/admin.controllers");
const _center = require("../controllers/centers.controllers");
const pages = require("../controllers/pages.controllers");

//PAGES
router.get("/seleccionar-centro-instrumento",pages.startEnroll);
router.get("/signin", pages.signin) //pagina del registro de usuario
router.get("/address", pages.insertAddress)// pagina registro de direccion
router.get("/passrecovery", pages.forgetPass) //Pagina para recuperar contraseña
router.get("/forgetpassword/:infoJwt", pages.newPassword) //Pagina para establecer la nueva contraseña
router.get("/login", pages.login) //Pagina que muestra el formulario de login

//USER
router.post("/register", user.register); //funcion que inserta en users
router.get("/findAll", user.findAll) //funcion que muestra todos los usuarios
router.post("/login", user.login) // funcion que verifica el usuario y la contraseña. pone una cookie
router.post("/setAddress", user.set_address) // comprueba la cookie e inserta en BD la direccion
router.post("/getUser",user.getUser) //Funcion que devuelve el token con el usuario y el email.
router.post("/verificar", user.verificar) //funcion que verifica que un usuario es el que pide cambiar la contraseña
router.post("/delete", user.delete) // borra usuario
router.post("/isbuyer", user.isbuyer) //funcion que escribe en BD que el usuario ha hecho una compra


//CLASSES
router.get("/mostrar-clases",_class.showAll);
router.get("/mostrar-clases",_class.showAll);
router.get("/clases-estudiante/:id",_class.showByUser);
router.post("/matricularse/:idClass/:idUser",_class.enroll);
//router.get("/mostrar-por-instrumento/",_class.showByCenter);
//router.get("/mostrar-por-centros-y-instrumento/",_class.showByCenter);
//ADMIN
// router.get("/login-admin/:id",_admin.login);
//INSTRUMENTS
router.get("/instruments", instrument.start);
router.get("/findInstruments", instrument.findInstruments);
router.post("/findCategory", instrument.findByCategory);

module.exports = router;
