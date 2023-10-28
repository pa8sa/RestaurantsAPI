const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares/admin");

const {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
} = require("../controllers/restaurants");

const {
  getAllFoods,
  getFood,
  deleteFood,
  updateFood,
  addFood,
} = require("../controllers/foods");

router.route("/").get(getAllRestaurants).post(isAdmin, addRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .delete(isAdmin, deleteRestaurant)
  .patch(isAdmin, updateRestaurant);

router.route("/:resId/foods").get(getAllFoods).post(isAdmin, addFood);
router
  .route("/:resId/foods/:id")
  .get(getFood)
  .delete(isAdmin, deleteFood)
  .patch(isAdmin, updateFood);

module.exports = router;
