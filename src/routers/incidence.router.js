const { Router } = require("express");
const router = Router();
const incidentsCtrl = require('../controller/incidents.controller')

router.get('/incidence', incidentsCtrl.getIncidents)

module.exports = router;
