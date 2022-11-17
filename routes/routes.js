const router = require("express").Router();
const _class = require("../controllers/classes.controllers");
const user = require("../controllers/users.controllers")

router.get("/mostrar-clases",_class.showAll);
router.post("/register", user.register)

module.exports = router;
