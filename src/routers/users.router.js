const { Router } = require("express");
const router = Router();
const usersCtrl = require('../controller/users.controller')

router.get("/users", usersCtrl.getUsers);
router.post("/users", usersCtrl.postUsers);
router.post("/login", usersCtrl.login);


module.exports = router;
