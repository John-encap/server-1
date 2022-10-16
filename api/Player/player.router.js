const {GetSessions,GetSessionPlayers,GetSessionCoach,GetEvents,GetCouncelling,GetEventDetails,GetPayments,GetMatchCoach,GetMatchPlayers,GetRanking} = require("./player.controller");
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


module.exports = router; 