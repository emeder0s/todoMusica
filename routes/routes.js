const router = require("express").Router();
const _class = require("../controllers/classes.controllers");
const user = require("../controllers/users.controllers")


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

module.exports = router;
