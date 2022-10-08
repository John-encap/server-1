const {createUser , selectEmployees ,selectPlayer, loginn, showPlayer} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/employees", selectEmployees);
router.get("/players", selectPlayer);

router.post("/login", loginn);
router.post("/playerSelect",showPlayer);


module.exports = router;