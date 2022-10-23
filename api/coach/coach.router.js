const {GetPSessionToday, GetPSessionAll, AddDateTime, GetPlayers, GetCoaches, GetAssignedPlayers, GetAssignedCoaches, MarkSessionAttendance, AllTeamA, PastAndMark} = require("./coach.controller");
const router = require("express").Router();


router.post("/practiceSession/Today", GetPSessionToday);
router.get("/practiceSession/All", GetPSessionAll);

router.post("/practiceSession/AddDateTime", AddDateTime);
router.post("/practiceSession/GetPlayers", GetPlayers);
router.post("/practiceSession/GetCoaches", GetCoaches);

router.post("/practiceSession/GetAssignedPlayers", GetAssignedPlayers);
router.post("/practiceSession/GetAssignedCoaches", GetAssignedCoaches);

// router.put("/practiceSession/UpdateDateonSession", UpdateDateonSession);

router.post("/practiceSession/MarkSessionAttendance", MarkSessionAttendance);



//feedbacks
router.get("/Achievements/AllTeamA", AllTeamA);//db wens karapn

//Matches
router.get("/Matches/PastAndMark", PastAndMark);






module.exports = router;