const {GetSessions,GetSessionPlayers,GetSessionCoach,GetEvents,GetCouncelling,GetEventDetails,GetPayments,GetMatchCoach,GetMatchPlayers} = require("./player.controller");
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


module.exports = router; 