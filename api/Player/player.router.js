const {GetSessions,GetSessionPlayers,GetSessionCoach,Attendance,performanceBowl,intro,performanceFld,performance,GetEvents,GetCouncelling,GetEventDetails,GetPayments,GetMatchCoach,GetMatchPlayers,GetRanking} = require("./player.controller");
const router = require("express").Router();


router.post("/session", GetSessions);
router.post("/sessionDetails", GetSessionPlayers);
router.post("/sessionCoaches", GetSessionCoach);
router.post("/counceling", GetCouncelling);
router.post("/events", GetEvents);
router.post("/eventDetails", GetEventDetails);
router.post("/payments", GetPayments);
router.post("/matchCoach", GetMatchCoach);
router.post("/matchPlayer", GetMatchPlayers);
router.post("/Ranking", GetRanking);
router.post("/performance", performance);
router.post("/performanceBowl", performanceBowl);
router.post("/performanceFld", performanceFld);
router.post("/intro", intro);
router.post("/Attendance", Attendance);


module.exports = router; 