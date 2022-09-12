const {createUser , selectEmployees ,selectPlayer, loginn} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/employees", selectEmployees);
router.get("/players", selectPlayer);
router.post("/login", loginn);



module.exports = router;