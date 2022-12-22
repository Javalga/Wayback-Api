const { Router } = require("express");
const router = Router();
const incident_typeCtrl = require('../controller/incidence_type.controller')

router.get("/incident_type", incident_typeCtrl.getIncidence_type);

module.exports = router;
