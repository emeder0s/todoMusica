const router = require("express").Router();
const _class = require("../controllers/classes.controllers")

router.get("/mostrar-clases",_class.showAll);

module.exports = router;
