const {GetSessions,GetSessionPlayers,GetSessionCoach} = require("./player.controller");
const router = require("express").Router();


router.post("/session", GetSessions);
router.post("/sessionDetails", GetSessionPlayers);
router.post("/sessionCoaches", GetSessionCoach);


module.exports = router; 