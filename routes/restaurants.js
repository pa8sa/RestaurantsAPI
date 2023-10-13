const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
} = require("../controllers/restaurants");

router.route("/").get(getAllRestaurants).post(addRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .delete(deleteRestaurant)
  .patch(updateRestaurant);

module.exports = router;
