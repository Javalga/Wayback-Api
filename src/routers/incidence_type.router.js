const { Router } = require("express");
const router = Router();
const incidence_typeCtrl = require('../controller/incidence_type.controller')

router.get("/incidence_type", incidence_typeCtrl.getIncidence_type);

module.exports = router;
