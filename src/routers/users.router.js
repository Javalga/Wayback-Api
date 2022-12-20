const { Router } = require("express");
const router = Router();
const usersCtrl = require('../controller/users.controller')

router.get("/users", usersCtrl.getUsers);

module.exports = router;
