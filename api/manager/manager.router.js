// const { route } = require("../user/user.router");
// <<<<<<< HEAD
// const { AddTournament, SelectMatch, SelectDate,  AddSession ,PaidPlayer, UnpaidPlayer, CheckPassword, AddEvent,GetUpcommingEvent,GetOldEvent, GetUpcommingSession, GetOldSession, SelectEvent, SelectSession, GetTeamAchi, AddTeamAchi, AddMembership,PlayerRole, EditEvent, EditSession, AddMatchTitle, GetMatchTitle, AddPracticeMatch} = require("./manager.controller");
// =======
const router = require("express").Router();
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
  DeleteMatch,
  AddMatchTitle,
  GetMatchTitle,
  AddPracticeMatch,
  AddAchivement,
  GetMembership,
  EditMembership,
  AddYearMembership,
  GetLastRow,
  FindPaid,
  GetFeedback,
  DeleteSession,
  DeleteEvent,
  DeleteMatchTitle,
} = require("./manager.controller");
// const { addAchivement } = require("./manager.service");



// >>>>>>> 4689e5994867c35a2c438d4affc678ae79ac0a7d


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
router.get("/getteamAchi",GetTeamAchi);
router.post("/addteamAchi",AddTeamAchi);
router.post("/addMembership",AddMembership);
router.post("/playerRole",PlayerRole);
router.post("/editEvent",EditEvent)
router.post("/editSession",EditSession);
router.post("/addMatchTitle",AddMatchTitle);
router.get("/getMatchTitle",GetMatchTitle);
router.post("/addPracticeMatch",AddPracticeMatch);
router.post("/deleteMatch",DeleteMatch);
router.post("/addAchivement",AddAchivement);
router.get("/getMembership",GetMembership);
router.post("/editMembership",EditMembership);
router.post("/addYearMembership",AddYearMembership);
router.get("/getLastRow",GetLastRow);
router.post("/findPaid",FindPaid);
router.get("/getFeedback", GetFeedback);
router.post("/deleteSession",DeleteSession);
router.post("/deleteEvent",DeleteEvent)
router.post("/deleteMatchTitle",DeleteMatchTitle)

module.exports = router;

