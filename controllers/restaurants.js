const Restaurant = require("../models/restaurant");

const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).send(restaurants);
};

module.exports = { getAllRestaurants };
