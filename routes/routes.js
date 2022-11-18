const router = require("express").Router();
const _class = require("../controllers/classes.controllers");
const _admin = require("../controllers/admin.controllers");
const _center = require("../controllers/centers.controllers");

router.get("/mostrar-clases",_class.showAll);
router.get("/clases-estudiante/:id",_class.showByUser);
router.get("/mostrar-por-centros/",_class.showByCenter);
router.post("/matricularse/:idClass/:idUser",_class.enroll);
//router.get("/mostrar-por-instrumento/",_class.showByCenter);
//router.get("/mostrar-por-centros-y-instrumento/",_class.showByCenter);
// router.get("/login-admin/:id",_admin.login);

module.exports = router;
