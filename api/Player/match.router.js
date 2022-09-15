const {GetMatches,GetPastMatches} = require("./match.controller");
const router = require("express").Router();


router.post("/matches", GetMatches);
router.post("/pastMatches", GetPastMatches);

module.exports = router; 