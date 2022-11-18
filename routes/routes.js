const router = require("express").Router();
const instrument = require("../controllers/instruments.controllers")


router.get("/instruments", instrument.start);
router.get("/findInstruments", instrument.findInstruments);
router.post("/findCategory", instrument.findByCategory);
module.exports = router;
