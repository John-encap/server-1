const {GetPSessionToday, GetPSessionAll, GetAllPastMatches, GetAssignedMatches, GetAppoinments} = require("./coach.controller");
const router = require("express").Router();


router.post("/practiceSession/Today", GetPSessionToday);
router.get("/practiceSession/All", GetPSessionAll);
router.post("/allmatches", GetAllPastMatches);
router.post("/assignedmatches", GetAssignedMatches);
router.post("/appoinments", GetAppoinments);

module.exports = router;