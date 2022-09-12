const {GetSessions} = require("./player.controller");
const router = require("express").Router();


router.post("/session", GetSessions);


module.exports = router;