const { Router } = require("express");
const router = Router();
const warehousesCtrl = require("../controller/warehouses.controller");

router.get("/warehouses", warehousesCtrl.getWarehouses);
router.post("/warehouses", warehousesCtrl.postWarehouses);
router.put("/warehouses", warehousesCtrl.putWarehouses);
router.delete("/warehouses", warehousesCtrl.deleteWarehouses);

module.exports = router;
