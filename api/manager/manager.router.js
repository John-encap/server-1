// const { route } = require("../user/user.router");
const { AddTournament, SelectMatch, SelectDate,  AddSession } = require("./manager.controller");

const router = require("express").Router();

router.post("/AddTournamentMatch", AddTournament);
router.get("/AddTournamentMatch" , SelectMatch);
router.get("/AddTournamentMatch/date" , SelectDate);
router.post("/AddCouncellingSession", AddSession);


module.exports = router;