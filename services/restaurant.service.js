const { returnService } = require("../functions/nestedReturn");
const Restaurant = require("../models/restaurant.model");

const findAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find();

    return returnService(true, restaurants);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const findRestaurantById = async (resId) => {
  try {
    const restaurant = await Restaurant.findById(resId);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const deleteRestaurantById = async (resId) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(resId);

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const updateRestaurant = async (resId, resData) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(resId, resData, {
      new: true,
    });

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const createRestaurant = async (resData) => {
  try {
    const restaurant = await Restaurant.create(resData);

    return returnService(true, restaurant);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

module.exports = {
  findAllRestaurants,
  findRestaurantById,
  deleteRestaurantById,
  updateRestaurant,
  createRestaurant,
};
