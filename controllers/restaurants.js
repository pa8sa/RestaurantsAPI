const Restaurant = require("../models/restaurant");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(400).send("Invalid Request");
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const addRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
};
