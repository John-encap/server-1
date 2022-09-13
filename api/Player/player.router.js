const {GetSessions,GetSessionDetails} = require("./player.controller");
const router = require("express").Router();


router.post("/session", GetSessions);
router.post("/sessionDetails", GetSessionDetails);


module.exports = router;