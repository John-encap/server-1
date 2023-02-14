const {GetPSessionToday, GetPSessionAll, AddDateTime, GetPlayers, GetCoaches,getOldSession,upCommingSessions, GetAssignedPlayers, GetAssignedCoaches, MarkSessionAttendance, AllTeamA, PastAndMark, markAttendance, getOldMarkedSession} = require("./coach.controller");
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
router.post("/getOldSession", getOldSession);
router.post("/getOldCompletedMarkedSessions", getOldMarkedSession);
router.post("/upCommingSessions", upCommingSessions);

//mark session attendance and feedbacks

router.post("/markPracticeSessionAttendance", markAttendance);


module.exports = router;