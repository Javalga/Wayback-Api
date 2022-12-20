const { Router } = require("express");
const router = Router();
const warehousesCtrl = require("../controller/warehouses.controller");

router.get("/warehouses", warehousesCtrl.getWarehouses);

module.exports = router;
