// const { route } = require("../user/user.router");
const { AddTournament, SelectMatch, SelectDate,  AddSession ,PaidPlayer, UnpaidPlayer, CheckPassword, AddEvent,GetUpcommingEvent,GetOldEvent, GetUpcommingSession, GetOldSession, SelectEvent, SelectSession} = require("./manager.controller");

const router = require("express").Router();

router.post("/AddTournamentMatch", AddTournament);
router.get("/AddTournamentMatch" , SelectMatch);
router.get("/AddTournamentMatch/date" , SelectDate);
router.post("/AddCouncellingSession", AddSession);
router.get("/payment/paid", PaidPlayer);
router.get("/payment/unpaid", UnpaidPlayer);
router.post("/getPassword", CheckPassword);
router.post("/addevent", AddEvent);
router.get("/getUpcommingEvent",GetUpcommingEvent);
router.get("/getOldevent",GetOldEvent);
router.get("/getUpcommingSession",GetUpcommingSession);
router.get("/getOldSession",GetOldSession);
router.post("/getEvent",SelectEvent);
router.post("/getSession",SelectSession);


module.exports = router;