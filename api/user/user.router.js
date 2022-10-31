const {createUser , selectEmployees ,selectPlayer, loginn, showPlayer, DeleteEmloyee, UpdateEmployee, PlayerRegistration} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/employees", selectEmployees);
router.post("/players", selectPlayer);
router.post("/login", loginn);
router.post("/playerSelect",showPlayer);
router.post("/deleteEmployee",DeleteEmloyee);
router.post("/updateEmployee",UpdateEmployee);
router.post("/playerRegistration",PlayerRegistration);

module.exports = router;