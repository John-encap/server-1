// const { route } = require("../user/user.router");
<<<<<<< HEAD
const {
  AddTournament,
  SelectMatch,
  SelectDate,
  amount,
  AddSession,
  PaidPlayer,
  UnpaidPlayer,
  CheckPassword,
  AddEvent,
  GetUpcommingEvent,
  GetOldEvent,
  GetUpcommingSession,
  GetOldSession,
  SelectEvent,
  SelectSession,
  GetTeamAchi,
  AddTeamAchi,
  AddMembership,
  PlayerRole,
  EditEvent,
  EditSession,
} = require("./manager.controller");
=======
const { AddTournament, SelectMatch, SelectDate,  AddSession ,PaidPlayer, UnpaidPlayer, CheckPassword, AddEvent,GetUpcommingEvent,GetOldEvent, GetUpcommingSession, GetOldSession, SelectEvent, SelectSession, GetTeamAchi, AddTeamAchi, AddMembership,PlayerRole, EditEvent, EditSession, AddMatchTitle, GetMatchTitle, AddPracticeMatch} = require("./manager.controller");
>>>>>>> 48caa793a79b2284a823d5e5704170bd263c8508

const router = require("express").Router();

router.post("/AddTournamentMatch", AddTournament);
router.get("/AddTournamentMatch", SelectMatch);
router.get("/AddTournamentMatch/date", SelectDate);
router.post("/AddCouncellingSession", AddSession);
router.get("/payment/paid", PaidPlayer);
router.get("/payment/unpaid", UnpaidPlayer);
router.post("/getPassword", CheckPassword);
router.post("/addevent", AddEvent);
<<<<<<< HEAD
router.get("/getUpcommingEvent", GetUpcommingEvent);
router.get("/getOldevent", GetOldEvent);
router.get("/getUpcommingSession", GetUpcommingSession);
router.get("/getOldSession", GetOldSession);
router.post("/getEvent", SelectEvent);
router.post("/getSession", SelectSession);
router.get("/getteamAchi", GetTeamAchi);
router.post("/addteamAchi", AddTeamAchi);
router.post("/addMembership", AddMembership);
router.post("/playerRole", PlayerRole);
router.post("/editEvent", EditEvent);
router.post("/editSession", EditSession);
router.get("/payment/amount", amount);

module.exports = router;
=======
router.get("/getUpcommingEvent",GetUpcommingEvent);
router.get("/getOldevent",GetOldEvent);
router.get("/getUpcommingSession",GetUpcommingSession);
router.get("/getOldSession",GetOldSession);
router.post("/getEvent",SelectEvent);
router.post("/getSession",SelectSession);
router.get("/getteamAchi",GetTeamAchi);
router.post("/addteamAchi",AddTeamAchi);
router.post("/addMembership",AddMembership);
router.post("/playerRole",PlayerRole);
router.post("/editEvent",EditEvent)
router.post("/editSession",EditSession);
router.post("/addMatchTitle",AddMatchTitle);
router.get("/getMatchTitle",GetMatchTitle);
router.post("/addPracticeMatch",AddPracticeMatch);

module.exports = router;
>>>>>>> 48caa793a79b2284a823d5e5704170bd263c8508
