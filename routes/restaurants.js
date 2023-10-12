const express = require("express");
const router = express.Router();

const { getAllRestaurants } = require("../controllers/restaurants");

router.route("/").get(getAllRestaurants);

module.exports = router;
