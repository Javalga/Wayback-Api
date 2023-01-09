const { Router } = require("express");
const router = Router();
const incidence_typeCtrl = require("../controller/delivery_time.controller");

router.get("/delivery_time", incidence_typeCtrl.getDelivery_time);

module.exports = router;
