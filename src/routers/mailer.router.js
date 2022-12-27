const { Router } = require("express");
const router = Router();
const mailerCtrl = require('../controller/mailer.controller')

router.post("/mailer", mailerCtrl.sendEmail);

module.exports = router;