const express = require("express");

const forgotPassword_route = express.Router();

const forgotPassword_controller = require("../controller/forgotPassword_controller");


forgotPassword_route.post("/password", forgotPassword_controller.link_generator)
forgotPassword_route.post("/reset", forgotPassword_controller.render_newpwd_page)
forgotPassword_route.post("/resetPwd", forgotPassword_controller.password_reset)

module.exports = forgotPassword_route;