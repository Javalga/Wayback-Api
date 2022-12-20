const { Router } = require("express");
const router = Router();
const locationsCtrl = require('../controller/locations.controller')

router.get('/locations', locationsCtrl.getLocations)

module.exports = router;
