const { Router } = require("express");
const router = Router();
const rolesCtrl = require("../controller/roles.controller");

router.get("/roles", rolesCtrl.getRoles);

module.exports = router;
