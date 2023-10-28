const express = require("express");
const router = express.Router();

const { signup, login, dashboard } = require("../controllers/users");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/dashboard").post(dashboard);

module.exports = router;