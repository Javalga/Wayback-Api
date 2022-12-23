const { Router } = require("express");
const router = Router();
const statusCtrl = require("../controller/status.controller");

router.get("/status", statusCtrl.getStatus);
router.put("/status", statusCtrl.putStatus);

module.exports = router;
