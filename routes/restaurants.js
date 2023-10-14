const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
} = require("../controllers/restaurants");
const { getAllFoods, getFood } = require("../controllers/foods");

router.route("/").get(getAllRestaurants).post(addRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .delete(deleteRestaurant)
  .patch(updateRestaurant);

router.route("/:resId/foods").get(getAllFoods);
router.route("/:resId/foods/:id").get(getFood);

module.exports = router;
