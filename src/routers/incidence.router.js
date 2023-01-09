const { Router } = require("express");
const router = Router();
const incidentsCtrl = require('../controller/incidence.controller')

router.get('/incidence', incidentsCtrl.getIncidences);
router.get("/incidence_processed", incidentsCtrl.getIncidenceProcessed);
router.post("/incidence", incidentsCtrl.postIncidence);
router.get("/incidence_solved", incidentsCtrl.getIncidenceSolved);
router.get("/incidence_to_return", incidentsCtrl.getIncidenceToReturn);
router.put("/incidence_form", incidentsCtrl.putIncidence);



module.exports = router;
