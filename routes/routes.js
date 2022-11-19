const router = require("express").Router();
const instrument = require("../controllers/instruments.controllers")
const _class = require("../controllers/classes.controllers");
const user = require("../controllers/users.controllers")
const _admin = require("../controllers/admin.controllers");
const _center = require("../controllers/centers.controllers");


router.get("/mostrar-clases",_class.showAll);
router.post("/register", user.register);
router.get("/findAll", user.findAll)
router.post("/login", user.login)
router.post("/setAddress", user.set_address)
router.get("/passrecovery", user.start)
router.post("/getUser",user.getUser)
router.get("/forgetpassword/:infoJwt", user.paginaPassword)
router.post("/verificar", user.verificar)
router.get("/address", user.insertAddress)
router.get("/mostrar-clases",_class.showAll);
router.get("/clases-estudiante/:id",_class.showByUser);
router.get("/mostrar-por-centros/",_class.showByCenter);
router.post("/matricularse/:idClass/:idUser",_class.enroll);
//router.get("/mostrar-por-instrumento/",_class.showByCenter);
//router.get("/mostrar-por-centros-y-instrumento/",_class.showByCenter);
// router.get("/login-admin/:id",_admin.login);
router.get("/instruments", instrument.start);
router.get("/findInstruments", instrument.findInstruments);
router.post("/findCategory", instrument.findByCategory);
module.exports = router;
