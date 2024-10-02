const { returnService } = require("../functions/nestedReturn");
const Restaurant = require("../models/restaurant.model");

const findAllRestaurantFoods = async (resId) => {
  try {
    const restaurant = await Restaurant.findById(resId);

    return returnService(true, restaurant.foods);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const findRestaurantFood = async (resId, foodId) => {
  try {
    const restaurant = await Restaurant.findById(resId);

    return returnService(true, restaurant.foods[foodId]);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const deleteRestaurantFood = async (resId, foodId) => {
  try {
    const restaurant = await Restaurant.findById(resId);
    restaurant.foods.splice(foodId, 1);
    await restaurant.save();

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const updateRestaurantFood = async (resId, foodId, foodData) => {
  try {
    const restaurant = await Restaurant.findById(resId);
    const food = restaurant.foods[foodId];
    food.set(foodData);
    await restaurant.save();

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const createRestaurantFood = async (resId, foodData) => {
  try {
    const restaurant = await Restaurant.findById(resId);
    restaurant.foods.push(foodData)
    await restaurant.save();

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

module.exports = {
  findAllRestaurantFoods,
  findRestaurantFood,
  deleteRestaurantFood,
  updateRestaurantFood,
  createRestaurantFood,
};
