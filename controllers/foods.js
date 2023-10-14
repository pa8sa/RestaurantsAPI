const Restaurant = require("../models/restaurant");

const getAllFoods = async (req, res) => {
  try {
    console.log(req.params.resId)
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const foods = restaurant.foods;
    res.status(200).send(foods);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const getFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const food = restaurant.foods[req.params.id];
    if (!food) {
      return res.status(404).send("Food Doesnt Found");
    }
    res.status(200).send(food);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};



module.exports = {
  getAllFoods,
  getFood,
};
