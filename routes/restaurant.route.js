const { Router } = require("express");
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

const restaurantRoute = () => {
  const restaurantRoute = "/restaurants";
  const router = Router();
  router.get(`${restaurantRoute}/`, getAllRestaurants);
  router.post(`${restaurantRoute}/`, isAdmin, addRestaurant);
  router.get(`${restaurantRoute}/:id`, getRestaurant);
  router.delete(`${restaurantRoute}/:id`, isAdmin, deleteRestaurant);
  router.patch(`${restaurantRoute}/:id`, isAdmin, updateRestaurant);
  router.get(`${restaurantRoute}/:resId/foods`, getAllFoods);
  router.post(`${restaurantRoute}/:resId/foods`, isAdmin, addFood);
  router.get(`${restaurantRoute}/:resId/foods/:id`, getFood);
  router.delete(`${restaurantRoute}/:resId/foods/:id`, isAdmin, deleteFood);
  router.patch(`${restaurantRoute}/:resId/foods/:id`, isAdmin, updateFood);
  return router;
};

module.exports = {
  restaurantRoute,
};
