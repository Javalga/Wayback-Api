const { Router } = require("express");
const router = Router();
const usersCtrl = require('../controller/users.controller')

router.get("/users", usersCtrl.getUsers);
router.get("/admin-recover-password", usersCtrl.getAdminToRecoverPassword);
router.post("/users", usersCtrl.postUsers);
router.put("/users", usersCtrl.putUser);
router.post("/login", usersCtrl.login);

module.exports = router;
